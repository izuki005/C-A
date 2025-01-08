const nodemailer = require('nodemailer');

// na parte de user coloque o e-mail que irpa utilizar o nodemailer
// na parte de pass coloque a senha para apps que tem dentro da sua conta do google
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codigoagora01@gmail.com',
    pass: 'qzfj zvlt gkcq xemu'
  }
});

module.exports = transporter;