const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'falcaomatheus08@gmail.com',
    pass: 'broe kznn iwzm shyi'
  }
});

module.exports = transporter;