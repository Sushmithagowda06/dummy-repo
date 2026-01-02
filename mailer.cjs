require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async (filePath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Dummy Cron" <${process.env.MAIL_USER}>`,
    to: process.env.REPORT_EMAILS.split(","),
    subject: "📊 Dummy Appointment Report",
    text: "Dummy DB export attached",
    attachments: [{ path: filePath }]
  });

  console.log("📧 Email sent");
};
