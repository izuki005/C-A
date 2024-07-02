const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email_controle');

router.post('/enviar', emailController.enviarEmail);
router.post('/verificar', emailController.verificarCodigo);

module.exports = router;