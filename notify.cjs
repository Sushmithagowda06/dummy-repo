const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = async ({ subject, message }) => {
  await transporter.sendMail({
    from: `"Cron Monitor" <${process.env.MAIL_USER}>`,
    to: process.env.REPORT_EMAILS.split(","),
    subject,
    text: message,
  });
};
