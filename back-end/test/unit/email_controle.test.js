const { enviarEmail, verificarCodigo, setCodigoArmazenado } = require('../../controllers/email_controle');

describe('emailController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('verificarCodigo', () => {
    it('deve verificar código com sucesso', () => {
      setCodigoArmazenado('123456');
      req.body.inCodigo = '123456';

      verificarCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Código verificado com sucesso!');
    });

    it('deve retornar erro para código inválido', () => {
      setCodigoArmazenado('123456');
      req.body.inCodigo = '654321';

      verificarCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Código inválido. Tente novamente.');
    });
  });
})