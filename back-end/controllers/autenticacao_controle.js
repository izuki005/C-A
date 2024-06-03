async function verificarLogin(req, res) {
  const { email, senha } = req.body;
  if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
  }

  const checkLoginQuery = `
      SELECT id_cadastro, nome, email, senha 
      FROM cadastro 
      WHERE email = @Email AND senha = @Senha
  `;

  try {
      const result = await global.conn.request()
          .input('Email', email)
          .input('Senha', senha)
          .query(checkLoginQuery);
      
      if (result.recordset.length > 0) {
          return res.status(200).json(result.recordset[0]);
      } else {
          return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }
  } catch (err) {
      // Não é mais necessário console.error
      return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
}

module.exports = {
  verificarLogin
};
