const sql = require('../db/database');

exports.cadastrarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;

  const checkProdutoQuery = `SELECT 1 FROM cadastro WHERE email=@Email`;

  global.conn.request()
    .input('Email', email)
    .query(checkProdutoQuery)
    .then((result) => {
      if (result.recordset.length > 0) {
        return res.status(400).json({ mensagem: 'Erro: Este email já está cadastrado' });
      }

      const insertQuery = `
        INSERT INTO cadastro (nome, email, senha)
        VALUES (@Nome, @Email, @Senha)
      `;

      global.conn.request()
        .input('Nome', nome)
        .input('Email', email)
        .input('Senha', senha)
        .query(insertQuery)
        .then(() => res.status(200).json({ mensagem: 'Cadastro registrado com sucesso.' }))
        .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
    })
    .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
};

exports.atualizarUsuario = (req, res) => {
  const { id_cadastro, nome, email, senha } = req.body;

  const checkIdQuery = `SELECT * FROM cadastro WHERE id_cadastro=@IdCadastro`;

  global.conn.request()
    .input('IdCadastro', id_cadastro)
    .query(checkIdQuery)
    .then((result) => {
      if (result.recordset.length === 0) {
        return res.status(400).json({ mensagem: 'Erro: ID de usuário não encontrado' });
      }

      const updateQuery = `
        UPDATE cadastro 
        SET nome = @Nome,
            email = @Email,
            senha = @Senha
        WHERE id_cadastro = @IdCadastro;
      `;

      global.conn.request()
        .input('Nome', nome)
        .input('Email', email)
        .input('Senha', senha)
        .input('IdCadastro', id_cadastro)
        .query(updateQuery)
        .then(() => res.status(200).json({ mensagem: 'Cadastro atualizado com sucesso.' }))
        .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
    })
    .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
};

exports.excluirUsuario = (req, res) => {
  const id_cadastro = req.body.id_cadastro; // Obtém o ID a ser excluído dos parâmetros da URL

    const deleteQuery = `
        DELETE FROM cadastro
        WHERE id_cadastro = ${id_cadastro}
    `;

    global.conn.request()
        .query(deleteQuery)
        .then(() => {
            res.status(200).json({ message: 'Conta excluída com sucesso' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Erro ao excluir a conta', details: err.message });
        });
};

exports.verificarSenha = (req, res) => {
  const { senha } = req.body;

  const checarSenha = `SELECT COUNT(*) AS count FROM cadastro WHERE senha=@Senha`;

  global.conn.request()
    .input('Senha', senha)
    .query(checarSenha)
    .then((result) => {
      const count = result.recordset[0].count;
      if (count > 0) {
        res.status(200).json({ senhaEncontrada: true });
      } else {
        res.status(200).json({ senhaEncontrada: false });
      }
    })
    .catch((err) => {
      res.status(500).json({ mensagem: 'Erro interno no servidor', details: err.message });
    });
};
