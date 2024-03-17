const sql = require('mssql')
const express = require('express')
const path = require('path')
var cors = require('cors')

const app = express()
const port = 3000; // porta padrão
app.use(express.json())
app.use(cors())

const config = {
    server: 'matheus004',
    database: 'teste',
    port: 1433,
    user: 'sa',
    password: 'jogo21',
    trustServerCertificate: true,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
            trustServerCertificate: true,
        },
    },
}

sql.connect(config)
    .then((conn) => {
        console.log('conectou')
        global.conn = conn
    })
    .catch((err) => {
        console.log(err)
    });

    function execSQLQuery(sqlQry, res){
        global.conn.request()
                    .query(sqlQry)
                    .then(result => res.json(result.recordset)) // EM caso de sucesso
                    .catch(err => res.json(err)) // em caso de erro
    }

app.post('/verificar_login', (req, res) => {
        const { email, senha } = req.body;
    
        // Verifica se o parâmetro email ou senha está faltando no corpo da solicitação
        if (!email || !senha) {
            return res.status(400).json({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
        }
    
        const checkLoginQuery = `
            SELECT id_cadastro, nome, email, senha 
            FROM cadastro 
            WHERE email = @email AND senha = @senha
        `;
    
        global.conn.request()
            .input('email', email)
            .input('senha', senha)
            .query(checkLoginQuery)
            .then((result) => {
                if (result.recordset && result.recordset.length > 0) {
                    return res.status(200).json(result.recordset[0]); // Retorna os dados do usuário encontrado
                } else {
                    return res.status(404).json({ mensagem: 'Usuário não encontrado.' }); // Usuário não encontrado
                }
            })
            .catch((err) => {
                console.error('Erro ao verificar o login:', err);
                return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
            });
    });
    
// Cadastrar tipo_produto
app.post('/cadastro_usuario', (req, res) => {
    const { nome, email, senha } = req.body;

    const checkProdutoQuery = `SELECT 1 FROM cadastro WHERE email='${email}'`;

    global.conn.request()
        .query(checkProdutoQuery)
        .then((result) => {
            if (result.recordset.length > 0) {
                return res.status(400).json({ mensagem: 'Erro: Este email já está cadastrado' });
            }

            // Se o produto não estiver cadastrado, realiza a inserção no banco de dados
            const insertQuery = `
            INSERT INTO cadastro (nome, email, senha)
            VALUES ('${nome}', '${email}', '${senha}')
            `;

            global.conn.request()
                .query(insertQuery)
                .then(() => res.status(200).json({ mensagem: 'Cadastro registrado com sucesso.' }))
                .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
        })
        .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
});

app.post('/verificar_senha', (req, res) => {
    const senha  = req.body.senha;

    const checarSenha = `
        SELECT COUNT(*) AS count 
        FROM cadastro 
        WHERE senha=@senha
    `;

    const request = new sql.Request();
    request.input('senha', sql.VarChar, senha);
    request.query(checarSenha, (error, result) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        // Verifica se a senha foi encontrada
        const count = result.recordset[0].count;
        if (count > 0) {
            // A senha foi encontrada
            res.status(200).json({ senhaEncontrada: true });
        } else {
            // A senha não foi encontrada
            res.status(200).json({ senhaEncontrada: false });
        }
    });
});


app.post('/atualizar_usuario', (req, res) => {
    const { id_cadastro, nome, email, senha } = req.body;

    // Verifica se o ID de usuário existe no banco de dados
    const checkIdQuery = `SELECT * FROM cadastro WHERE id_cadastro=@id_cadastro`;

    global.conn.request()
        .input('id_cadastro', id_cadastro)
        .query(checkIdQuery)
        .then((result) => {
            if (result.recordset.length === 0) {
                return res.status(400).json({ mensagem: 'Erro: ID de usuário não encontrado' });
            }

            // Se o ID do usuário for encontrado, realiza a atualização no banco de dados
            const updateQuery = `
                UPDATE cadastro 
                SET nome = @nome,
                    email = @email,
                    senha = @senha
                WHERE id_cadastro = @id_cadastro;
            `;

            global.conn.request()
                .input('nome', nome)
                .input('email', email)
                .input('senha', senha)
                .input('id_cadastro', id_cadastro)
                .query(updateQuery)
                .then(() => res.status(200).json({ mensagem: 'Cadastro atualizado com sucesso.' }))
                .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
        })
        .catch((err) => res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message }));
});

// Endpoint para mostrar a lista de tipo_produto cadastradas
app.get('/lista_produto', (req, res) => {
    const listaprodutoQuery = `
    SELECT 
        p.sku,
        p.produto,
        m.marca,
        tp.tipo_produto,
        p.preco_unitario,
        p.custo_unitario,
        p.observacao 
    FROM 
        produtos p
    LEFT JOIN 
        marca m ON p.id_marca = m.id_marca
    LEFT JOIN 
        tipo_produto tp ON p.id_tipo_produto = tp.id_tipo_produto
`; // Seleciona o ID e o nome do produto

    global.conn.request()
        .query(listaprodutoQuery)
        .then(result => {
            const produto = result.recordset; // Obtém todos os produto do resultado da consulta

            if (produto.length > 0) {
                res.status(200).json(produto); // Retorna todos os roduto, incluindo seus IDs
            } else {
                res.status(404).json({ mensagem: 'Não há produtos cadastrados.' });
            }
        })
        .catch(err => {
            // Em caso de erro, retorna uma mensagem de erro
            res.status(500).json({ mensagem: 'Erro interno no servidor', error: err.message });
        });
});

// Rota de exclusão de tipo_produto
app.delete('/apagar_produto', (req, res) => {
    const sku = req.body.sku; // Obtém o ID a ser excluído dos parâmetros da URL

    const deleteQuery = `
        DELETE FROM produtos 
        WHERE sku = ${sku}
    `;

    global.conn.request()
        .query(deleteQuery)
        .then(() => {
            res.status(200).json({ message: 'produto excluído com sucesso' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Erro ao excluir o tipo_produto', details: err.message });
        });
});

/// Endpoint para obter todas as marcas
app.get('/marcas', (req, res) => {
    const sqlQuery = 'SELECT id_marca, marca FROM marca';
    execSQLQuery(sqlQuery, res);
});

// Endpoint para obter todos os tipos de produto
app.get('/tipos_produto', (req, res) => {
    const sqlQuery = 'SELECT id_tipo_produto, tipo_produto FROM tipo_produto';
    execSQLQuery(sqlQuery, res);
});

app.listen(port, () => {
        console.log('o servidor está rodando na porta: http://localhost:3000/cadastro_marca')
    })
