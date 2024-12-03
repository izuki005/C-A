const request = require('supertest');
const express = require('express');
const path = require('path');
const router = require('../../routes/view_routes'); // Atualize com o caminho correto do arquivo

const app = express();
app.use(router);

describe('Teste de integração - Rotas de arquivos HTML', () => {
  test('Deve retornar o HTML de /cadastro com sucesso', async () => {
    const response = await request(app).get('/cadastro');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar o HTML de /config com sucesso', async () => {
    const response = await request(app).get('/config');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar o HTML de /index com sucesso', async () => {
    const response = await request(app).get('/index');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar o HTML de /inicio-jogo com sucesso', async () => {
    const response = await request(app).get('/inicio-jogo');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar o HTML de /login com sucesso', async () => {
    const response = await request(app).get('/login');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar o HTML de /oasis com sucesso', async () => {
    const response = await request(app).get('/oasis');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar o HTML de /capa_jogo com sucesso', async () => {
    const response = await request(app).get('/capa_jogo');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
  });

  test('Deve retornar erro 404 para uma rota inexistente', async () => {
    const response = await request(app).get('/rota_inexistente');
    expect(response.status).toBe(404);
  });
});