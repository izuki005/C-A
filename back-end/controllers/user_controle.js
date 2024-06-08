const crypto = require('crypto');

async function cadastrarUsuario (req, res) {
  const { nome, email, senha } = req.body;

  try {
    const checkProdutoQuery = `SELECT 1 FROM cadastro WHERE email=@Email`;
    const checkResult = await global.conn.request()
      .input('Email', email)
      .query(checkProdutoQuery);

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ mensagem: 'Erro: Este email já está cadastrado' });
    }

    const hashedSenha = crypto.createHash('md5').update(senha).digest('hex');

    const insertQuery = `
      INSERT INTO cadastro (nome, email, senha)
      VALUES (@Nome, @Email, @Senha)
    `;

    await global.conn.request()
      .input('Nome', nome)
      .input('Email', email)
      .input('Senha', hashedSenha) // Inserir a senha criptografada
      .query(insertQuery);

    res.status(200).json({ mensagem: 'Cadastro registrado com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message });
  }
};

async function atualizarUsuario (req, res) {
  const { id_cadastro, nome, email, senha } = req.body;

  try {
    const checkIdQuery = `SELECT * FROM cadastro WHERE id_cadastro=@IdCadastro`;
    const checkResult = await global.conn.request()
      .input('IdCadastro', id_cadastro)
      .query(checkIdQuery);

    if (checkResult.recordset.length === 0) {
      return res.status(400).json({ mensagem: 'Erro: ID de usuário não encontrado' });
    }

    const hashedSenha = crypto.createHash('md5').update(senha).digest('hex')

    const updateQuery = `
      UPDATE cadastro 
      SET nome = @Nome,
          email = @Email,
          senha = @Senha
      WHERE id_cadastro = @IdCadastro;
    `;

    await global.conn.request()
      .input('Nome', nome)
      .input('Email', email)
      .input('Senha', hashedSenha)
      .input('IdCadastro', id_cadastro)
      .query(updateQuery);

    res.status(200).json({ mensagem: 'Cadastro atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }); // Linha 80
  }
};


async function excluirUsuario (req, res)  {
  const id_cadastro = req.body.id_cadastro;

  try {
    const deleteQuery = `
      DELETE FROM cadastro
      WHERE id_cadastro = ${id_cadastro}
    `;

    await global.conn.request()
      .query(deleteQuery);

    res.status(200).json({ mensagem: 'Conta excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir a conta', details: err.message }); // Linha 102
  }
};


async function verificarSenha(req, res) {
  const { senha } = req.body;

  try {
    const hashedSenha = crypto.createHash('md5').update(senha).digest('hex');

    const checarSenha = `SELECT COUNT(*) AS count FROM cadastro WHERE senha=@Senha`;
    const result = await global.conn.request()
      .input('Senha', hashedSenha) // Verificar a senha criptografada
      .query(checarSenha);

    const count = result.recordset[0].count;
    if (count > 0) {
      res.status(200).json({ senhaEncontrada: true });
    } else {
      res.status(404).json({ error: 'Senha não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro interno no servidor', details: err.message });
  }
}

module.exports = {
  cadastrarUsuario, atualizarUsuario, excluirUsuario, verificarSenha
};