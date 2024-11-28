const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codigoagora01@gmail.com',
    pass: 'opzp aihm cgur xlie'
  }
});

module.exports = transporter;