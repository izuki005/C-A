const { enviarEmail, verificarCodigo, setCodigoArmazenado } = require('../../controllers/email_controle');
const transporter = require('../../config/nodemailer_config');

jest.mock('../../config/nodemailer_config');
jest.mock('../../utils/gerar_codigo', () => jest.fn().mockReturnValue('123456'));

describe('enviarEmail', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: { email: 'teste@example.com' } };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('deve enviar o email com sucesso', async () => {
    transporter.sendMail.mockResolvedValue({});
    const codigo = '123456';
    setCodigoArmazenado(codigo);

    await enviarEmail(req, res);

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: 'ADM_Codigo_Agora <falcaomatheus08@gmail.com>',
      replyTo: 'matheus.falcao@faculdadecesusc.edu.br',
      to: 'teste@example.com',
      subject: 'Código de Verificação',
      text: `Seu código de verificação é: ${codigo}`,
      html: expect.any(String),
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Email enviado com sucesso!');
  });

  it('deve retornar uma mensagem de erro ao falhar no envio do email', async () => {
    transporter.sendMail.mockRejectedValue(new Error('Erro no envio'));

    await enviarEmail(req, res);

    expect(transporter.sendMail).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erro ao enviar email: Erro no envio');
  });
});

describe('verificarCodigo', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: { inCodigo: '' } };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('deve verificar o código com sucesso', async () => {
    const codigo = '123456';
    req.body.inCodigo = codigo;
    setCodigoArmazenado(codigo);

    await verificarCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Código verificado com sucesso!');
  });

  it('deve retornar uma mensagem de erro para código inválido', async () => {
    req.body.inCodigo = '654321';

    await verificarCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Código inválido. Tente novamente.');
  });
});
