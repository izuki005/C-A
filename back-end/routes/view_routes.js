const express = require('express');
const path = require('path');
const router = express.Router();

// Servindo HTMLs
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/cadastro.html'));
});

router.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/config.html'));
});

router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/index.html'));
});

router.get('/inicio-jogo', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/inicio-jogo.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/login.html'));
});

router.get('/oasis', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/oasis.html'));
});


module.exports = router;
