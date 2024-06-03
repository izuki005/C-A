const express = require('express');
const router = express.Router();
const autenticacao = require('../controllers/autenticacao_controle');

router.post('/login', autenticacao.verificarLogin);

module.exports = router;