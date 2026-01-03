const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendReport = async (buffer) => {
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.REPORT_EMAIL,
    subject: "Appointments Report",
    text: "Attached is today's appointments report.",
    attachments: [
      {
        filename: "appointments.xlsx",
        content: buffer,
      },
    ],
  });
};
