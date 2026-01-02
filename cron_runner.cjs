require("dotenv").config();
const cron = require("node-cron");
const fs = require("fs");

const seedDB = require("./seed_db.cjs");
const exportDB = require("./export_db.cjs");
const sendMail = require("./mailer.cjs");
const notify = require("./notify.cjs");

const FLAG_FILE = "export_success.flag";

console.log("🟢 Cron service running...");

/* ===============================
   SHARED EXPORT JOB
================================ */
async function runExportJob(type) {
  const time = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  // ⛔ Skip retry if primary succeeded
  if (type === "RETRY" && fs.existsSync(FLAG_FILE)) {
    console.log("⏩ Skipping retry — already exported");
    return;
  }

  try {
    console.log(`⏰ ${type} cron started at ${time}`);

    await seedDB();            // recreate DB
    const file = await exportDB(); // export Excel
    await sendMail(file);      // email attachment

    fs.writeFileSync(FLAG_FILE, "OK");

    await notify({
      subject: `✅ EXPORT SUCCESS (${type})`,
      message: `Export completed at ${time}`,
    });

    console.log("✅ Export completed");

  } catch (err) {
    console.error("❌ Export failed:", err);

    await notify({
      subject: `❌ EXPORT FAILED (${type})`,
      message: `Failed at ${time}\n\n${err.message}`,
    });
  }
}

/* ===============================
   PRIMARY — 8:40 PM IST
   Cron: 40 20 * * *
================================ */
cron.schedule("30 21 * * *", async () => {
  await runExportJob("PRIMARY");
});

/* ===============================
   RETRY — 11:30 PM IST
   Cron: 30 23 * * *
================================ */
cron.schedule("30 23 * * *", async () => {
  await runExportJob("RETRY");
});

/* ===============================
   RESET FLAG — Midnight
================================ */
cron.schedule("0 0 * * *", () => {
  if (fs.existsSync(FLAG_FILE)) {
    fs.unlinkSync(FLAG_FILE);
    console.log("🔄 Export flag reset for next day");
  }
});

/* ===============================
   KEEP RAILWAY CONTAINER ALIVE
================================ */
setInterval(() => {}, 1000 * 60 * 60);
