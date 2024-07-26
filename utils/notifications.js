const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "raycabackend@gmail.com",
    pass: "wtydiixrhnavusod",
  },
  debug: false,
});

const sendNotification = async (email, subject, text) => {
  const mailOptions = {
    from: "raycabackend@gmail.com",
    to: email,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} with subject: ${subject}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
};

module.exports = { sendNotification };
