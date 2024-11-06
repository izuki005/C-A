const express = require('express');
const router = express.Router();
const { completarFase } = require('../controllers/completar_fase');

router.post('/completar_fase', completarFase); // Define a rota POST para completar a fase

module.exports = router;