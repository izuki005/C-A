const { verificarLogin } = require('../../controllers/autenticacao_controle');
const { buscarFasesUsuario } = require('../../controllers/autenticacao_controle');

jest.mock('../../controllers/autenticacao_controle', () => ({
    ...jest.requireActual('../../controllers/autenticacao_controle'),
    buscarFasesUsuario: jest.fn(), // Mock da função buscarFasesUsuario
}));

describe('verificarLogin', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        global.conn = {
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            query: jest.fn(),
        };
    });

    it('deve retornar uma mensagem de erro se email ou senha não forem fornecidos', async () => {
        req.body = { email: '', senha: '' };

        await verificarLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
    });

    it('deve retornar os dados do usuário e fases se o login for bem-sucedido', async () => {
        req.body = { email: 'teste@example.com', senha: 'senha123' };

        global.conn.query.mockResolvedValue({
            recordset: [{ id_cadastro: 1, nome: 'Teste', email: 'teste@example.com', senha: 'senha123' }]
        });

        buscarFasesUsuario.mockResolvedValue([
            { nome_fase: 'Fase 1', nome_oasis: 'Oasis 1', completada: true },
            { nome_fase: 'Fase 2', nome_oasis: 'Oasis 2', completada: false },
        ]);

        await verificarLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id_cadastro: 1,
            nome: 'Teste',
            email: 'teste@example.com',
            fases: [
                { nome_fase: 'Fase 1', nome_oasis: 'Oasis 1', completada: true },
                { nome_fase: 'Fase 2', nome_oasis: 'Oasis 2', completada: false }
            ]
        });
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