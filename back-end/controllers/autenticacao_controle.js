const crypto = require('crypto');

async function verificarLogin(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
    }
  
    try {
        const criptografada = crypto.createHash('md5').update(senha).digest('hex');
  
        const checkLoginQuery = `
            SELECT id_cadastro, nome, email, senha 
            FROM cadastro 
            WHERE email = @Email AND senha = @Senha
        `;
  
        const result = await global.conn.request()
            .input('Email', email)
            .input('Senha', criptografada)
            .query(checkLoginQuery);
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            // Retornando a senha original em vez da hash
            user.senha = senha;
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
  }
  
  module.exports = {
    verificarLogin
  };
  