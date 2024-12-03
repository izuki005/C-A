const transporter = require('../config/nodemailer_config');
const gerarCodigo = require('../utils/gerar_codigo');

async function enviarEmail(email) {
  const codigo = gerarCodigo(6);

  const info = await transporter.sendMail({
    from: 'ADM_Codigo_Agora <falcaomatheus08@gmail.com>',
    replyTo: 'matheus.falcao@faculdadecesusc.edu.br',
    to: email,
    subject: 'Código de Verificação',
    text: `Seu código de verificação é: ${codigo}`,
    html: `<html>
      <body>
        <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
          <h1 style="text-align: center; color: #333;">Código de Verificação de E-mail</h1>
          <p style="text-align: center; background-color: #f0f0f0; padding: 10px; border-radius: 5px; font-size: 24px; font-weight: bold;">${codigo}</p>
          <p style="text-align: center;">Para copiar o código, selecione o texto acima e pressione Ctrl+C (ou Command+C no Mac).</p>
        </div>
      </body>
    </html>`
  });

  return codigo;
}

module.exports = {
  enviarEmail
};