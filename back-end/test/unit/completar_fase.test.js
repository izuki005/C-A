const { completarFase } = require('../../controllers/completar_fase');
const db = require('../../db/database');
const httpMocks = require('node-mocks-http');

// Mock das dependências
jest.mock('../../db/database'); // Mock do módulo db

describe('Testes para a função completarFase', () => {
    let req, res;

    beforeEach(() => {
        // Criação de mocks para o req e res
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    it('deve retornar erro 500 se a conexão com o banco não estiver ativa', async () => {
        // Simula uma conexão com o banco de dados não ativa
        global.conn = null;
    
        req.body = {
            id_fase: 1,
            id_cadastro: 1
        };
    
        await completarFase(req, res);
    
        expect(res.statusCode).toBe(500);
        // Parse do JSON retornado para comparar como objeto
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual(expect.objectContaining({
            message: 'Conexão com o banco de dados não estabelecida.'
        }));
    });
    
    it('deve retornar erro 404 se a fase não for encontrada', async () => {
        // Simula uma conexão ativa e um retorno de consulta vazio
        global.conn = { connected: true };
        db.sql.Request.mockReturnValue({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockResolvedValue({ recordset: [] })
        });
    
        req.body = {
            id_fase: 1,
            id_cadastro: 1
        };
    
        await completarFase(req, res);
    
        expect(res.statusCode).toBe(404);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual(expect.objectContaining({
            message: 'Fase não encontrada ou não disponível para o usuário'
        }));
    });
    
    it('deve retornar sucesso se a fase não estiver completada', async () => {
        // Simula uma consulta com a fase encontrada, mas não completada
        global.conn = { connected: true };
        db.sql.Request.mockReturnValue({
            input: jest.fn().mockReturnThis(),
            query: jest.fn()
                .mockResolvedValueOnce({ recordset: [{ completada: false }] })
                .mockResolvedValueOnce({ recordset: [] })
        });
    
        req.body = {
            id_fase: 1,
            id_cadastro: 1
        };
    
        await completarFase(req, res);
    
        expect(res.statusCode).toBe(200);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual(expect.objectContaining({
            message: 'Fase completada com sucesso!'
        }));
    });
    
    it('deve retornar sucesso se a fase já tiver sido completada', async () => {
        // Simula a fase já completada
        global.conn = { connected: true };
        db.sql.Request.mockReturnValue({
            input: jest.fn().mockReturnThis(),
            query: jest.fn()
                .mockResolvedValueOnce({ recordset: [{ completada: true }] })
        });
    
        req.body = {
            id_fase: 1,
            id_cadastro: 1
        };
    
        await completarFase(req, res);
    
        expect(res.statusCode).toBe(200);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual(expect.objectContaining({
            message: 'Fase já foi completada anteriormente.'
        }));
    });
    
    it('deve retornar erro 500 em caso de erro no servidor', async () => {
        // Simula um erro no banco de dados
        global.conn = { connected: true };
        db.sql.Request.mockReturnValue({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockRejectedValue(new Error('Erro no servidor'))
        });
    
        req.body = {
            id_fase: 1,
            id_cadastro: 1
        };
    
        await completarFase(req, res);
    
        expect(res.statusCode).toBe(500);
        const responseData = JSON.parse(res._getData());
        expect(responseData).toEqual(expect.objectContaining({
            message: 'Erro no servidor'
        }));
    });
})    