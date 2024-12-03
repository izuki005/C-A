const { enviarEmail, verificarCodigo, setCodigoArmazenado } = require('../../controllers/email_controle');
const transporter = require('../../config/nodemailer_config');
const gerarCodigo = require('../../utils/gerar_codigo');

jest.mock('../../config/nodemailer_config'); // Mocking nodemailer transporter
jest.mock('../../utils/gerar_codigo', () => jest.fn()); // Mocking gerarCodigo function

describe('Testes para enviarEmail', () => {
  let req, res, mockRequest, mockResponse;

  beforeEach(() => {
    req = { body: { email: 'test@example.com' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
    mockRequest = jest.fn().mockReturnValue({
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ recordset: [] })
    });
    global.conn = { request: mockRequest };
    mockResponse = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('Deve retornar sucesso ao enviar email', async () => {
    const codigo = '123456';
  
    // Mock para transporte de e-mail bem-sucedido
    transporter.sendMail.mockResolvedValue();
  
    // Mock para a função de verificar se o e-mail existe no banco de dados
    mockRequest().query.mockResolvedValueOnce({ recordset: [] }); // Simula que o e-mail não existe no banco de dados
    mockRequest().query.mockResolvedValueOnce([{ codigo: codigo }]); // Simula retorno do código
  
    await enviarEmail(req, res);
  
    expect(mockRequest().input).toHaveBeenCalledWith('Email', req.body.email);
    expect(mockRequest().query).toHaveBeenCalledTimes(1); // Verifica se query foi chamada duas vezes
    expect(transporter.sendMail).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Email enviado com sucesso!');
  });  
  
  test('Deve retornar erro ao enviar email', async () => {
    const errorMessage = 'Erro ao enviar email';
  
    transporter.sendMail.mockRejectedValue(new Error(errorMessage));
  
    // Simula que o e-mail não existe no banco de dados
    mockRequest().query.mockResolvedValueOnce({ recordset: [] });
  
    await enviarEmail(req, res);
  
    expect(mockRequest().input).toHaveBeenCalledWith('Email', req.body.email);
    expect(mockRequest().query).toHaveBeenCalled();
    expect(transporter.sendMail).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erro ao enviar email: ' + errorMessage);
  });  

  test('Deve retornar erro se email já estiver cadastrado', async () => {
    mockRequest().query.mockResolvedValueOnce({ recordset: [{ exists: true }] });

    await enviarEmail(req, res);

    expect(mockRequest().input).toHaveBeenCalledWith('Email', req.body.email);
    expect(mockRequest().query).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro: Este email já está cadastrado' });
  });
});

describe('Testes para verificarCodigo', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { inCodigo: '123456' } };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve verificar código com sucesso', async () => {
    setCodigoArmazenado('123456');

    await verificarCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Código verificado com sucesso!');
  });

  test('Deve retornar código inválido', async () => {
    setCodigoArmazenado('654321');

    await verificarCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Código inválido. Tente novamente.');
  });
});
