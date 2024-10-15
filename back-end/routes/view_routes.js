const express = require('express');
const path = require('path');
const router = express.Router();

// Servindo HTMLs
router.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/cadastro.html'));
});

router.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/config.html'));
});

router.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/index.html'));
});

router.get('/inicio-jogo', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/inicio-jogo.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/login.html'));
});

router.get('/oasis', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/oasis.html'));
});

router.get('/capa_jogo', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front-End/src/views/html/capa_jogo.html'));
});

router.get('/conteudos', (req, res) => {
    res.render('../../Front-End/src/views/templates/conteudos.pug'); // Sem a extensão .pug
});


module.exports = router;