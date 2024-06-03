const express = require('express');
const router = express.Router();
const user = require('../controllers/user_controle');

router.post('/cadastrar', user.cadastrarUsuario);
router.post('/atualizar', user.atualizarUsuario);
router.post('/excluir', user.excluirUsuario);
router.post('/verificar_senha', user.verificarSenha);

module.exports = router;