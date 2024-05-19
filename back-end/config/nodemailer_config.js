const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'falcaomatheus08@gmail.com',
    pass: 'skex tnfx rjbo ebio'
  }
});

module.exports = transporter;