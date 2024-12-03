const express = require('express');
const router = express.Router();
const autenticacao = require('../controllers/autenticacao_controle');

// Rota para login
router.post('/login', autenticacao.verificarLogin);

// Nova rota para obter informações do usuário pelo id_cadastro
router.get('/info/:id_cadastro', autenticacao.obterInformacoesUsuario);

module.exports = router;