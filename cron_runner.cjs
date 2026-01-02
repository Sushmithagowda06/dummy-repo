require("dotenv").config();

const seedDB = require("./seed_db.cjs");
const exportDB = require("./export_db.cjs");
const sendMail = require("./mailer.cjs");
const notify = require("./notify.cjs");

(async () => {
  const startTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  try {
    console.log("⏰ Cron started at", startTime);

    await seedDB();                  // recreate DB
    const file = await exportDB();   // export
    await sendMail(file);            // email attachment

    await notify({
      subject: "✅ EXPORT SUCCESS",
      message: `Export completed successfully at ${startTime}`,
    });

    console.log("✅ Cron completed");
    process.exit(0);

  } catch (err) {
    console.error("❌ Cron failed:", err);

    await notify({
      subject: "❌ EXPORT FAILED",
      message: `Export FAILED at ${startTime}\n\nError:\n${err.message}`,
    });

    process.exit(1);
  }
})();
