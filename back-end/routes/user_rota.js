const express = require('express');
const router = express.Router();
const userControle = require('../controllers/user_controle');

router.post('/cadastrar', userControle.cadastrarUsuario);
router.post('/atualizar', userControle.atualizarUsuario);
router.post('/excluir', userControle.excluirUsuario);
router.post('/verificar_senha', userControle.verificarSenha);

module.exports = router;