const sql = require('../db/database');

exports.verificarLogin = (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
  }

  const checkLoginQuery = `
    SELECT id_cadastro, nome, email, senha 
    FROM cadastro 
    WHERE email = @Email AND senha = @Senha
  `;

  global.conn.request()
    .input('Email', email)
    .input('Senha', senha)
    .query(checkLoginQuery)
    .then((result) => {
      if (result.recordset.length > 0) {
        res.status(200).json(result.recordset[0]);
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }
    })
    .catch((err) => {
      console.error('Erro ao verificar o login:', err);
      res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    });
};
