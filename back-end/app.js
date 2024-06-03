const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth_rota');
const emailRoutes = require('./routes/email_rota');
const userRoutes = require('./routes/user_rota');

const app = express();

app.use(express.json());
app.use(cors());

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, '../Front-End/src')));
app.use(express.static(path.join(__dirname, '../Front-End/src/views')));
app.use('/imgs', express.static(path.join(__dirname, '../Front-End/src/views/templates/imgs')));

// Configuração do template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../Front-End/src/views/templates'));

// Rotas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/email', emailRoutes);

// Servindo HTMLs
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/src/views/cadastro.html'));
});

app.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/src/views/config.html'));
});

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/src/views/index.html'));
});

app.get('/inicio-jogo', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/src/views/inicio-jogo.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/src/views/login.html'));
});

app.get('/oasis', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front-End/src/views/oasis.html'));
});

// Rota para renderizar um arquivo Pug
app.get('/pug', (req, res) => {
    res.render('base', { title: 'FUNCIONOU ATÉ COM COR!!!', message: 'CARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI' });
});

module.exports = app;
