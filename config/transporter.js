const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mtorres.mjr@gmail.com",
    pass: "spbrwwiwrmbmsjvl",
  },
});

module.exports = transporter;
