const nodemailer = require("nodemailer");

module.exports = async (filePath) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Gmail uses TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Dummy Cron" <${process.env.EMAIL_USER}>`,
    to: process.env.REPORT_EMAILS,
    subject: "📊 Daily Export Report",
    text: "Attached is the exported report.",
    attachments: [
      {
        filename: "appointments.xlsx",
        path: filePath,
      },
    ],
  });
};
