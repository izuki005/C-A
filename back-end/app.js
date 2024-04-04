const sql = require('mssql');
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'falcaomatheus08@gmail.com',
      pass: 'skex tnfx rjbo ebio'
    }
  });

const app = express();
const port = 3000; // porta padrão
app.use(express.json());
app.use(cors());

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
        console.log('conectou');
        global.conn = conn;
    })
    .catch((err) => {
        console.log(err);
    });

function execSQLQuery(sqlQry, res){
    global.conn.request()
                .query(sqlQry)
                .then(result => res.json(result.recordset)) // Em caso de sucesso
                .catch(err => res.json(err)); // Em caso de erro
}

// Servir os arquivos estáticos
app.use(express.static(path.join(__dirname, '../Front-End')));

// Rota GET para /cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/cadastro.html'));
});

let codigoArmazenado = ''; // Variável global para armazenar o código gerado

function gerarCodigo(tamanho) {
    // Defina os caracteres permitidos para o código
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';

    // Gere um código com o tamanho especificado
    for (let i = 0; i < tamanho; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return codigo;
}

// Rota para enviar e-mail
app.post('/enviar-email', async (req, res) => {
    const { email } = req.body; // Obtém o e-mail do destinatário do corpo da solicitação
    const codigo = gerarCodigo(6)

    try {
        // Enviar o email
        const info = await transporter.sendMail({
            from: 'Codigo_Agora <falcaomatheus08@gmail.com>', // Remetente personalizado
            replyTo: 'matheus.falcao@faculdadecesusc.edu.br', // Foto do remetente
            to: email,
            subject: 'Código de Verificação',
            text: `Seu código de verificação é: ${codigo}`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificação de E-mail</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        background-color: #f5f5f5;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .code-container {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .verification-code {
                        background-color: #f0f0f0;
                        padding: 10px 20px;
                        border-radius: 5px;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        text-align: center;
                    }
                    .copy-button {
                        background-color: #007bff;
                        border: none;
                        color: #fff;
                        padding: 10px 20px;
                        font-size: 18px;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }
                    .copy-button:hover {
                        background-color: #0056b3;
                        cursor: pointer;
                    }
                </style>
                <script>
                    function copyCode() {
                        const codeInput = document.querySelector('verification-code');
                        codeInput.select();
                        document.execCommand('copy');
                        alert('Código copiado para a área de transferência!');
                    }
                </script>
            </head>
            <body>
                <div class="container">
                    <h1>Código de Verificação de E-mail</h1>
                    <div class="code-container">
                        <input class="verification-code" value="${codigo}" readonly>
                        <p>Para copiar o código, selecione o texto acima e pressione Ctrl+C (ou Command+C no Mac).</p>
                        <br><br>
                        <button class="copy-button" onclick="copyCode()">Copiar Código</button>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        // Armazenar o código gerado
        codigoArmazenado = codigo;
        res.status(200).send('Email enviado com sucesso!'); // Retorna uma resposta de sucesso ao cliente
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).send('Erro ao enviar email: ' + error.message); // Retorna uma resposta de erro ao cliente
    }
});


// Rota para verificar o código de verificação
app.post('/verificarHash', async (req, res) => {
    const { inCodigo } = req.body; // Obtém o código inserido pelo usuário

    try {
        // Comparar o código inserido com o código armazenado
        if (inCodigo === codigoArmazenado) {
            res.status(200).send('Código verificado com sucesso!');
        } else {
            res.status(400).send('Código inválido. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar código:', error);
        res.status(500).send('Erro ao verificar código: ' + error.message);
    }
});



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

// Rota de exclusão de tipo_produto
app.delete('/apagar_usuario', (req, res) => {
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
});

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});