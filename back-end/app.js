const sql = require('mssql');
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'falcaomatheus08@gmail.com',
        pass: 'gvcf ukxr ykzb tznn', // Cada email tem sua senha única, este é a senha do email falcaomatheus08@gmail.com
    }
})

async function main() {
    try {

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
        
        // Use a função para gerar um código de 6 caracteres
        const codigo = gerarCodigo(6);

        // send mail with defined transport object
        const info = await transport.sendMail({
            from: '"Maddison Foo Koch 👻" <falcaomatheus08@gmail.com>', // sender address
            to: "falcaomatheus08@gmail.com", // list of receivers
            subject: "Código de verificação", // Subject line
            text: `Estou aqui atoa`, // plain text body
            html: `Digite este código de verificação para finalizar seu cadastro!<br> <strong style ="font-size: 20pt">${codigo}</strong>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

const app = express();
const port = 3000; // porta padrão
app.use(express.json());
app.use(cors());

const config = {
    server: 'KAWANGABRIEL',
    database: 'teste',
    port: 1433,
    user: 'sa',
    password: 'Acabana2009*',
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
        main()
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