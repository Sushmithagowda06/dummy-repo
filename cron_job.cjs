require("dotenv").config();

const seedDB = require("./seed_db.cjs");
const exportDB = require("./export_db.cjs");
const sendMail = require("./mailer.cjs");
const notify = require("./notify.cjs");

module.exports = async function runJob() {
  const time = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  console.log("🚀 Job started at", time);

  try {
    await seedDB();                 // recreate DB
    const file = await exportDB();  // export to Excel
    await sendMail(file);           // send attachment

    await notify({
      subject: "✅ EXPORT SUCCESS",
      message: `Export completed successfully at ${time}`,
    });

  } catch (err) {
    await notify({
      subject: "❌ EXPORT FAILED",
      message: `Export failed at ${time}\n\n${err.message}`,
    });

    throw err;
  }
};
