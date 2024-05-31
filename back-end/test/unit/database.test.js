const sql = require('mssql');
const { connectDatabase } = require('../../db/database');

jest.mock('mssql', () => ({
    connect: jest.fn(),
  }));
  
  describe('Testando Conexão com o Banco', () => {
    let originalConsoleLog;
    let originalConsoleError;
  
    beforeAll(() => {
      // Salva os métodos originais de console.log e console.error
      originalConsoleLog = console.log;
      originalConsoleError = console.error;
    });
  
    beforeEach(() => {
      // Define funções mock para console.log e console.error
      console.log = jest.fn();
      console.error = jest.fn();
    });
  
    afterEach(() => {
      // Restaura os métodos originais de console.log e console.error após cada teste
      console.log.mockRestore();
      console.error.mockRestore();
    });
  
    afterAll(() => {
      // Restaura os métodos originais de console.log e console.error após todos os testes
      console.log = originalConsoleLog;
      console.error = originalConsoleError;
    });
  
    it('deve conectar ao banco de dados com sucesso', async () => {
      const mockConnection = {};
      sql.connect.mockResolvedValueOnce(mockConnection);
  
      await connectDatabase();
  
      expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
      expect(global.conn).toBe(mockConnection);
      expect(console.log).toHaveBeenCalledWith('Conectado ao banco de dados');
    });
  
    it('deve lidar com erros ao conectar ao banco de dados', async () => {
      const mockError = new Error('Erro ao conectar ao banco de dados');
      sql.connect.mockRejectedValueOnce(mockError);
  
      await expect(connectDatabase()).rejects.toThrow(mockError);
  
      expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
      expect(console.error).toHaveBeenCalledWith('Erro ao conectar ao banco de dados:', mockError);
    });
  });