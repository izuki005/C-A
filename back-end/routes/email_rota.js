const express = require('express');
const router = express.Router();
const email = require('../controllers/email_controle');

router.post('/enviar', email.enviarEmail);
router.post('/verificar', email.verificarCodigo);

module.exports = router;