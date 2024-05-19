const express = require('express');
const router = express.Router();
const emailControle = require('../controllers/email_controle');

router.post('/enviar', emailControle.enviarEmail);
router.post('/verificar', emailControle.verificarCodigo);

module.exports = router;