const request = require('supertest');
const express = require('express');
const emailRoutes = require('../../routes/email_rota');

// Mocking nodemailer
jest.mock('../../config/nodemailer_config', () => ({
  sendMail: jest.fn().mockResolvedValue('Email enviado')
}));

const app = express();
app.use(express.json());
app.use('/email', emailRoutes);

// Importa o controlador de email para usar setCodigoArmazenado
const emailController = require('../../controllers/email_controle');

describe('Controlador de Email', () => {
  beforeEach(() => {
    emailController.setCodigoArmazenado(''); // Reseta o código armazenado antes de cada teste
  });

  test('deve enviar um email e retornar status 200', async () => {
    const response = await request(app)
      .post('/email/enviar')
      .send({ email: 'test@example.com' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Email enviado com sucesso!');
  });

  test('deve retornar status 500 se o envio do email falhar', async () => {
    require('../../config/nodemailer_config').sendMail.mockRejectedValue(new Error('Falha ao enviar email'));

    const response = await request(app)
      .post('/email/enviar')
      .send({ email: 'test@example.com' });
    expect(response.statusCode).toBe(500);
    expect(response.text).toContain('Erro ao enviar email');
  });

  test('deve verificar o código e retornar status 200', async () => {
    // Define manualmente o código armazenado usando setCodigoArmazenado
    emailController.setCodigoArmazenado('123456');

    const response = await request(app)
      .post('/email/verificar')
      .send({ inCodigo: '123456' });
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Código verificado com sucesso!');
  });

  test('deve retornar status 400 para um código inválido', async () => {
    // Define manualmente o código armazenado usando setCodigoArmazenado
    emailController.setCodigoArmazenado('123456');

    const response = await request(app)
      .post('/email/verificar')
      .send({ inCodigo: '654321' });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Código inválido. Tente novamente.');
  });
});

