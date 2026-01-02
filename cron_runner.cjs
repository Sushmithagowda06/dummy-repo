require("dotenv").config();

const seedDB = require("./seed_db.cjs");
const exportDB = require("./export_db.cjs");
const sendMail = require("./mailer.cjs");
const notify = require("./notify.cjs");

(async () => {
  const startTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  console.log("⏰ Railway cron triggered at", startTime);

  try {
    await seedDB();                 // recreate DB
    console.log("🗄️ DB seeded");

    const file = await exportDB();  // export Excel
    console.log("📄 Exported DB");

    await sendMail(file);           // send email
    console.log("📧 Email sent");

    await notify({
      subject: "✅ EXPORT SUCCESS",
      message: `Export completed successfully at ${startTime}`,
    });

    console.log("✅ Job completed");
    process.exit(0);

  } catch (err) {
    console.error("❌ Job failed:", err);

    await notify({
      subject: "❌ EXPORT FAILED",
      message: `Export FAILED at ${startTime}\n\n${err.message}`,
    });

    process.exit(1);
  }
})();
