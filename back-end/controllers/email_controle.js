const transporter = require('../config/nodemailer_config');
const gerarCodigo = require('../utils/gerar_codigo');

let codigoArmazenado = '';

async function enviarEmail(req, res) {
  const { email } = req.body;
  const codigo = gerarCodigo(6);

  try {
    // Check if email already exists in the database
    const checkEmailQuery = `SELECT 1 FROM cadastro WHERE email = @Email`;
    const checkResult = await global.conn.request()
      .input('Email', email)
      .query(checkEmailQuery);

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ mensagem: 'Erro: Este email já está cadastrado' });
    }

    await transporter.sendMail({
      from: 'ADM_Codigo_Agora <codigoagora01@gmail.com>',
      replyTo: 'codigoagora01@gmail.com',
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

    codigoArmazenado = codigo;
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao enviar email: ' + error.message);
  }
}

async function verificarCodigo(req, res) {
  const { inCodigo } = req.body;

  if (inCodigo === codigoArmazenado) {
    res.status(200).send('Código verificado com sucesso!');
  } else {
    res.status(400).send('Código inválido. Tente novamente.');
  }
}

function setCodigoArmazenado(codigo) {
  codigoArmazenado = codigo;
}

module.exports = {
  enviarEmail,
  verificarCodigo,
  setCodigoArmazenado
};