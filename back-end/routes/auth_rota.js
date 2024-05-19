const express = require('express');
const router = express.Router();
const autenticacaoControle = require('../controllers/autenticacao_controle');

router.post('/login', autenticacaoControle.verificarLogin);

module.exports = router;