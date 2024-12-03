const request = require('supertest');
const express = require('express');
const emailRoutes = require('../../routes/email_rota');
const emailController = require('../../controllers/email_controle');

// Mocking nodemailer
jest.mock('../../config/nodemailer_config', () => ({
  sendMail: jest.fn().mockResolvedValue('Email enviado')
}));

// Mock global.conn.request().input().query()
const mockQuery = jest.fn();

global.conn = {
  request: jest.fn().mockReturnValue({
    input: jest.fn().mockReturnValue({
      query: mockQuery
    })
  })
};

const app = express();
app.use(express.json());
app.use('/email', emailRoutes);

describe('Controlador de Email', () => {
  beforeEach(() => {
    emailController.setCodigoArmazenado(''); // Reseta o código armazenado antes de cada teste
    jest.clearAllMocks(); // Limpa todos os mocks antes de cada teste
  });

  test('deve enviar email com sucesso e retornar status 200', async () => {
    mockQuery.mockResolvedValueOnce({ recordset: [] });

    const response = await request(app)
      .post('/email/enviar')
      .send({ email: 'test@example.com' });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Email enviado com sucesso!');
  });

  test('deve retornar status 500 se o envio do email falhar', async () => {
    mockQuery.mockResolvedValueOnce({ recordset: [] });
    require('../../config/nodemailer_config').sendMail.mockRejectedValueOnce(new Error('Falha ao enviar email'));

    const response = await request(app)
      .post('/email/enviar')
      .send({ email: 'test@example.com' });

    expect(response.statusCode).toBe(500);
    expect(response.text).toContain('Erro ao enviar email');
  });

  test('deve retornar status 400 se o email já estiver cadastrado', async () => {
    mockQuery.mockResolvedValueOnce({ recordset: [{}] });

    const response = await request(app)
      .post('/email/enviar')
      .send({ email: 'test@example.com' });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ mensagem: 'Erro: Este email já está cadastrado' });
  });

  test('deve verificar o código e retornar status 200', async () => {
    emailController.setCodigoArmazenado('123456');

    const response = await request(app)
      .post('/email/verificar')
      .send({ inCodigo: '123456' });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Código verificado com sucesso!');
  });

  test('deve retornar status 400 para um código inválido', async () => {
    emailController.setCodigoArmazenado('123456');

    const response = await request(app)
      .post('/email/verificar')
      .send({ inCodigo: '654321' });

    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Código inválido. Tente novamente.');
  });
});
