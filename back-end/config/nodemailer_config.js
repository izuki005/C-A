const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codigoagora01@gmail.com',
    pass: 'qzfj zvlt gkcq xemu'
  }
});

module.exports = transporter;