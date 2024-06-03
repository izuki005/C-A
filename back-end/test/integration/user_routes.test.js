const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../../routes/user_rota');

const app = express();
app.use(bodyParser.json());
app.use('/usuario', userRoutes);

describe('User Controller', () => {
    beforeEach(() => {
        // Resetar mock da conexão ao banco de dados antes de cada teste
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn()
        };
    });

    test('deve cadastrar um usuário com sucesso', async () => {
        global.conn.query
            .mockResolvedValueOnce({ recordset: [] }) // Para verificar se o email já está cadastrado
            .mockResolvedValueOnce({}); // Para a inserção do usuário

        const response = await request(app)
            .post('/usuario/cadastrar')
            .send({ nome: 'Novo Usuário', email: 'novo@example.com', senha: 'senha123' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('mensagem', 'Cadastro registrado com sucesso.');
    });

    test('deve falhar ao cadastrar um usuário com email já existente', async () => {
        global.conn.query
            .mockResolvedValueOnce({ recordset: [{ email: 'novo@example.com' }] }); // Email já cadastrado

        const response = await request(app)
            .post('/usuario/cadastrar')
            .send({ nome: 'Novo Usuário', email: 'novo@example.com', senha: 'senha123' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'Erro: Este email já está cadastrado');
    });

    test('deve retornar 500 em caso de erro interno ao cadastrar', async () => {
        global.conn.query
            .mockRejectedValueOnce(new Error('Erro interno no servidor')); // Erro ao verificar o email

        const response = await request(app)
            .post('/usuario/cadastrar')
            .send({ nome: 'Erro Usuário', email: 'erro@example.com', senha: 'senha' });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('mensagem', 'Erro interno no servidor');
    });

    test('deve atualizar um usuário com sucesso', async () => {
        global.conn.query
            .mockResolvedValueOnce({ recordset: [{ id_cadastro: 1 }] }) // Verifica se o ID existe
            .mockResolvedValueOnce({}); // Para a atualização do usuário

        const response = await request(app)
            .post('/usuario/atualizar')
            .send({ id_cadastro: 1, nome: 'Usuário Atualizado', email: 'atualizado@example.com', senha: 'nova_senha123' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('mensagem', 'Cadastro atualizado com sucesso.');
    });

    test('deve falhar ao atualizar um usuário com ID não existente', async () => {
        global.conn.query
            .mockResolvedValueOnce({ recordset: [] }); // ID não encontrado

        const response = await request(app)
            .post('/usuario/atualizar')
            .send({ id_cadastro: 999, nome: 'Usuário Atualizado', email: 'atualizado@example.com', senha: 'nova_senha123' });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('mensagem', 'Erro: ID de usuário não encontrado');
    });

    test('deve retornar 500 em caso de erro interno ao atualizar', async () => {
        global.conn.query
            .mockRejectedValueOnce(new Error('Erro interno no servidor')); // Erro ao verificar o ID

        const response = await request(app)
            .post('/usuario/atualizar')
            .send({ id_cadastro: 1, nome: 'Erro Usuário', email: 'erro@example.com', senha: 'senha' });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('mensagem', 'Erro interno no servidor');
    });

    test('deve excluir um usuário com sucesso', async () => {
        global.conn.query.mockResolvedValueOnce({}); // Para a exclusão do usuário

        const response = await request(app)
            .post('/usuario/excluir')
            .send({ id_cadastro: 1 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('mensagem', 'Conta excluída com sucesso');
    });

    test('deve retornar 500 em caso de erro interno ao excluir', async () => {
        global.conn.query
            .mockRejectedValueOnce(new Error('Erro interno no servidor')); // Erro ao excluir

        const response = await request(app)
            .post('/usuario/excluir')
            .send({ id_cadastro: 1 });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Erro ao excluir a conta');
    });

    test('deve verificar uma senha com sucesso', async () => {
        global.conn.query.mockResolvedValueOnce({ recordset: [{ count: 1 }] }); // Senha encontrada

        const response = await request(app)
            .post('/usuario/verificar_senha')
            .send({ senha: 'senha123' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('senhaEncontrada', true);
    });

    test('deve falhar ao verificar uma senha não existente', async () => {
        global.conn.query.mockResolvedValueOnce({ recordset: [{ count: 0 }] }); // Senha não encontrada

        const response = await request(app)
            .post('/usuario/verificar_senha')
            .send({ senha: 'senhaerrada' });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Senha não encontrada');
    });

    test('deve retornar 500 em caso de erro interno ao verificar senha', async () => {
        global.conn.query
            .mockRejectedValueOnce(new Error('Erro interno no servidor')); // Erro ao verificar senha

        const response = await request(app)
            .post('/usuario/verificar_senha')
            .send({ senha: 'senha123' });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('mensagem', 'Erro interno no servidor');
    });
});
