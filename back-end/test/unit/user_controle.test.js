const { cadastrarUsuario, atualizarUsuario, excluirUsuario, verificarSenha } = require('../../controllers/user_controle');
///////////////////////////////////////////////////////// CADASTRANDO USUÁRIO /////////////////////////////////////////////////////////////
describe('cadastrarUsuario', () => {
    it('deve retornar uma mensagem de sucesso ao cadastrar um novo usuário', async () => {
      const req = {
        body: {
          nome: 'Teste',
          email: 'teste@example.com',
          senha: 'senha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({ recordset: [] })
        }).mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({})
        })
      };
  
      await cadastrarUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Cadastro registrado com sucesso.' });
    });
  
    it('deve retornar um erro ao tentar cadastrar um usuário com email já existente', async () => {
      const req = {
        body: {
          nome: 'Teste',
          email: 'teste@example.com',
          senha: 'senha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({ recordset: [{ 1: 'email' }] })
        })
      };
  
      await cadastrarUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro: Este email já está cadastrado' });
    });
  
    it('deve retornar um erro interno do servidor', async () => {
      const req = {
        body: {
          nome: 'Teste',
          email: 'teste@example.com',
          senha: 'senha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockRejectedValueOnce(new Error('Erro no servidor'))
        })
      };
  
      await cadastrarUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro interno no servidor', error: 'Erro no servidor' });
    });
  });
///////////////////////////////////////////////////////// ATUALIZAR USUÁRIO /////////////////////////////////////////////////////////////
  describe('atualizarUsuario', () => {
    it('deve retornar uma mensagem de sucesso ao atualizar um usuário existente', async () => {
      const req = {
        body: {
          id_cadastro: 1,
          nome: 'Novo Nome',
          email: 'novoemail@example.com',
          senha: 'novasenha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({ recordset: [{ id_cadastro: 1 }] })
        }).mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({})
        })
      };
  
      await atualizarUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Cadastro atualizado com sucesso.' });
    });
  
    it('deve retornar um erro ao tentar atualizar um usuário com ID inexistente', async () => {
      const req = {
        body: {
          id_cadastro: 999,
          nome: 'Novo Nome',
          email: 'novoemail@example.com',
          senha: 'novasenha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({ recordset: [] })
        })
      };
  
      await atualizarUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro: ID de usuário não encontrado' });
    });
  
    it('deve retornar um erro interno do servidor', async () => {
      const req = {
        body: {
          id_cadastro: 1,
          nome: 'Novo Nome',
          email: 'novoemail@example.com',
          senha: 'novasenha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockRejectedValueOnce(new Error('Erro no servidor'))
        })
      };
  
      await atualizarUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro interno no servidor', error: 'Erro no servidor' });
    });
  });
///////////////////////////////////////////////////////// EXCLUIR USUÁRIO  /////////////////////////////////////////////////////////////
  describe('excluirUsuario', () => {
    it('deve retornar uma mensagem de sucesso ao excluir um usuário existente', async () => {
      const req = {
        body: {
          id_cadastro: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          query: jest.fn().mockResolvedValueOnce({})
        })
      };
  
      await excluirUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ mensagem: 'Conta excluída com sucesso' });
    });
  
    it('deve retornar um erro interno do servidor', async () => {
      const req = {
        body: {
          id_cadastro: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          query: jest.fn().mockRejectedValueOnce(new Error('Erro no servidor'))
        })
      };
  
      await excluirUsuario(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao excluir a conta', details: 'Erro no servidor' });
    });
  });
///////////////////////////////////////////////////////// VERIFICANDO SENHA /////////////////////////////////////////////////////////////
  describe('verificarSenha', () => {
    it('deve retornar true ao verificar uma senha existente', async () => {
      const req = {
        body: {
          senha: 'senha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({ recordset: [{ count: 1 }] })
        })
      };
  
      await verificarSenha(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ senhaEncontrada: true });
    });
  
    it('deve retornar false ao verificar uma senha inexistente', async () => {
      const req = {
        body: {
          senha: 'senha123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
  
      global.conn = {
        request: jest.fn().mockReturnValueOnce({
          input: jest.fn().mockReturnThis(),
          query: jest.fn().mockResolvedValueOnce({ recordset: [{ count: 0 }] })
        })
      };
  
      await verificarSenha(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Senha não encontrada' });
    });

    it('deve retornar um erro 500 em caso de erro interno do servidor', async () => {
        const req = {
          body: {
            senha: 'senha123'
          }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
      
        global.conn = {
          request: jest.fn().mockReturnValueOnce({
            input: jest.fn().mockReturnThis(),
            query: jest.fn().mockRejectedValueOnce(new Error('Erro no servidor')) // Simula um erro interno do servidor
          })
        };
      
        await verificarSenha(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status retornado é 500
        expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro interno no servidor', details: 'Erro no servidor' }); // Verifica se a mensagem de erro é retornada corretamente
      });      
  });
  