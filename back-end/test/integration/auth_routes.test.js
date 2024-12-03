const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { verificarLogin } = require('../../controllers/autenticacao_controle');

const app = express();
app.use(bodyParser.json());
app.post('/auth/login', verificarLogin);

describe('POST /auth/login', () => {
    it('deve responder com um login bem-sucedido', async () => {
        // Mock da conexão e consulta ao banco de dados
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({
                recordset: [{
                    id_cadastro: 1,
                    nome: 'Usuário Teste',
                    email: 'teste@example.com',
                    senha: 'senha'
                }]
            })
        };

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'teste@example.com', senha: 'senha' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id_cadastro', 1);
        expect(response.body).toHaveProperty('nome', 'Usuário Teste');
        expect(response.body).toHaveProperty('email', 'teste@example.com');
    });

    it('deve falhar com credenciais incorretas', async () => {
        // Mock da conexão e consulta ao banco de dados
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [] })
        };

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'errado@example.com', senha: 'senhaerrada' });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('mensagem', 'Usuário não encontrado.');
    });

    it('deve retornar 400 se o email ou a senha estiverem faltando', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'teste@example.com' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'Email ou senha não foram fornecidos na solicitação.');
    });
    
    it('deve retornar 500 em caso de erro interno do servidor', async () => {
        // Mock da conexão e consulta ao banco de dados
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockRejectedValue(new Error('Erro interno do servidor'))
        };

        const response = await request(app)
            .post('/auth/login')
            .send({ email: 'teste@example.com', senha: 'senha' });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('mensagem', 'Erro interno no servidor.');
    });
});

