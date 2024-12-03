const request = require('supertest');
const express = require('express');
const { completarFase } = require('../../controllers/completar_fase');
const db = require('../../db/database');

jest.mock('mssql'); // Mock do módulo mssql

const app = express();
app.use(express.json());
app.post('/fase/completar_fase', completarFase);

describe('Teste de Integração - completarFase', () => {
  let mockRequest; // Mock para simular a conexão global com o banco

  beforeEach(() => {
    // Mock da conexão global
    global.conn = { connected: true };
    mockRequest = {
      input: jest.fn(),
      query: jest.fn(),
    };
    db.sql = { Request: jest.fn(() => mockRequest) }; // Substitui a requisição SQL pelo mock
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  test('Deve completar a fase com sucesso', async () => {
    // Mock do comportamento do banco
    mockRequest.query
      .mockResolvedValueOnce({ recordset: [{ completada: false }] }) // Fase encontrada e não completada
      .mockResolvedValueOnce(); // Atualização bem-sucedida

    const response = await request(app)
      .post('/fase/completar_fase')
      .send({ id_fase: 1, id_cadastro: 123 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Fase completada com sucesso!');
    expect(mockRequest.query).toHaveBeenCalledTimes(2); // Verificou a fase e atualizou
  });

  test('Deve retornar erro se a conexão com o banco não estiver ativa', async () => {
    global.conn.connected = false; // Simula conexão inativa

    const response = await request(app)
      .post('/fase/completar_fase')
      .send({ id_fase: 1, id_cadastro: 123 });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Conexão com o banco de dados não estabelecida.');
  });

  test('Deve retornar erro se a fase não for encontrada', async () => {
    mockRequest.query.mockResolvedValueOnce({ recordset: [] }); // Nenhuma fase encontrada

    const response = await request(app)
      .post('/fase/completar_fase')
      .send({ id_fase: 1, id_cadastro: 123 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Fase não encontrada ou não disponível para o usuário');
  });

  test('Deve retornar mensagem se a fase já foi completada', async () => {
    mockRequest.query.mockResolvedValueOnce({ recordset: [{ completada: true }] }); // Fase já completada

    const response = await request(app)
      .post('/fase/completar_fase')
      .send({ id_fase: 1, id_cadastro: 123 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Fase já foi completada anteriormente.');
  });

  test('Deve retornar erro no servidor em caso de exceção', async () => {
    mockRequest.query.mockRejectedValue(new Error('Erro inesperado no banco')); // Simula erro

    const response = await request(app)
      .post('/fase/completar_fase')
      .send({ id_fase: 1, id_cadastro: 123 });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erro no servidor');
    expect(response.body).toHaveProperty('error');
  });
});