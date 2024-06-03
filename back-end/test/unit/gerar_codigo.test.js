const gerarCodigo = require('../../utils/gerar_codigo');

test('gerarCodigo deve gerar um código do tamanho especificado', async () => {
  const tamanho = 10;
  const codigo = await gerarCodigo(tamanho);
  expect(codigo).toHaveLength(tamanho);
});

test('gerarCodigo deve gerar um código apenas com caracteres válidos', async () => {
  const tamanho = 15;
  const codigo = await gerarCodigo(tamanho);
  const caracteresValidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < codigo.length; i++) {
    expect(caracteresValidos).toContain(codigo[i]);
  }
});

test('gerarCodigo deve gerar códigos diferentes em chamadas consecutivas', async () => {
  const tamanho = 20;
  const codigo1 = await gerarCodigo(tamanho);
  const codigo2 = await gerarCodigo(tamanho);
  expect(codigo1).not.toBe(codigo2);
});
