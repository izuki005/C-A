const { verificarLogin, buscarFasesUsuario, obterInformacoesUsuario } = require('../../controllers/autenticacao_controle');
const crypto = require('crypto');

jest.mock('crypto'); // Mock para a função de hash

describe('verificarLogin', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn()
        };

        // Mock para o hash de senha
        crypto.createHash.mockReturnValue({
            update: jest.fn().mockReturnThis(),
            digest: jest.fn().mockReturnValue('hashedPassword123')
        });
    });

    it('deve retornar uma mensagem de erro se email ou senha não forem fornecidos', async () => {
        req.body = { email: '', senha: '' };

        await verificarLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
    });

    it('deve retornar os dados do usuário se o login for bem-sucedido', async () => {
        req.body = { email: 'teste@example.com', senha: 'senha123' };

        global.conn.query.mockResolvedValue({
            recordset: [{ id_cadastro: 1, nome: 'Teste', email: 'teste@example.com' }]
        });

        await verificarLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            id_cadastro: 1,
            nome: 'Teste',
            email: 'teste@example.com',
            senha: 'senha123'
        }));        
    });

    it('deve retornar uma mensagem de erro se o usuário não for encontrado', async () => {
        req.body = { email: 'naoencontrado@example.com', senha: 'senhaerrada' };

        global.conn.query.mockResolvedValue({ recordset: [] });

        await verificarLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário não encontrado.' });
    });

    it('deve retornar uma mensagem de erro se ocorrer um erro interno no servidor', async () => {
        req.body = { email: 'teste@example.com', senha: 'senha123' };

        global.conn.query.mockRejectedValue(new Error('Erro interno no servidor'));

        await verificarLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro interno no servidor.' });
    });
});

describe('buscarFasesUsuario', () => {
    beforeEach(() => {
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn()
        };
    });

    it('deve retornar as fases do usuário', async () => {
        const mockFases = [
            { nome_fase: 'Fase 1', completada: true },
            { nome_fase: 'Fase 2', completada: false }
        ];
        global.conn.query.mockResolvedValue({ recordset: mockFases });

        const result = await buscarFasesUsuario(1);

        expect(result).toEqual(mockFases);
    });

    it('deve lançar um erro se a consulta falhar', async () => {
        global.conn.query.mockRejectedValue(new Error('Erro ao buscar fases'));

        await expect(buscarFasesUsuario(1)).rejects.toThrow('Erro ao buscar fases');
    });
});

describe('obterInformacoesUsuario', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn()
        };
    });

    it('deve retornar uma mensagem de erro se o ID de cadastro não for fornecido', async () => {
        req.params = {};

        await obterInformacoesUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'ID de cadastro não foi fornecido.' });
    });

    it('deve retornar as informações do usuário e as fases', async () => {
        req.params = { id_cadastro: 1 };
        global.conn.query
            .mockResolvedValueOnce({ recordset: [{ id_cadastro: 1, nome: 'Teste', email: 'teste@example.com' }] })
            .mockResolvedValueOnce({ recordset: [{ nome_fase: 'Fase 1', completada: true }] });

        await obterInformacoesUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id_cadastro: 1,
            nome: 'Teste',
            email: 'teste@example.com',
            fases: [{ nome_fase: 'Fase 1', completada: true }]
        });
    });

    it('deve retornar uma mensagem de erro se o usuário não for encontrado', async () => {
        req.params = { id_cadastro: 999 };
        global.conn.query.mockResolvedValue({ recordset: [] });

        await obterInformacoesUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Usuário não encontrado.' });
    });

    it('deve retornar uma mensagem de erro se ocorrer um erro interno no servidor', async () => {
        req.params = { id_cadastro: 1 };
        global.conn.query.mockRejectedValue(new Error('Erro interno no servidor'));

        await obterInformacoesUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro interno no servidor.' });
    });
});