const nodemailer = require("nodemailer");

const initializeSocketIO = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  const notifyClient = (message) => {
    io.emit("notification", message);
  };

  return { notifyClient };
};

const sendNotification = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { initializeSocketIO, sendNotification };
