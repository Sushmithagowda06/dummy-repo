require("dotenv").config();
const exportDB = require("./export_db.cjs");
const sendMail = require("./mailer.cjs");

(async () => {
  console.log("⏰ Cron job started");

  try {
    const file = await exportDB();
    await sendMail(file);
    console.log("✅ Job completed");
    process.exit(0);
  } catch (e) {
    console.error("❌ Job failed:", e);
    process.exit(1);
  }
})();
