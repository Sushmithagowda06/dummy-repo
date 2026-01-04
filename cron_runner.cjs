require("dotenv").config();

const cron = require("node-cron");
const exportDb = require("./export_db.cjs");
const mailer = require("./mailer.cjs");

process.env.TZ = "Asia/Kolkata";

async function runJob() {
  try {
    console.log("📤 Exporting DB...");
    const buffer = await exportDb();

    console.log("📧 Sending mail...");
    await mailer.sendReport(buffer);

    console.log("✅ Job finished successfully");
  } catch (err) {
    console.error("❌ Job failed:", err);
  }
}

// 10:15 PM IST
cron.schedule("21 00 * * *", runJob);

// run immediately (local + Railway)
runJob();
