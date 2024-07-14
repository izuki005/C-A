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

// Importar o arquivo de rotas
const viewRoutes = require('./routes/view_routes');

// Usar as rotas
app.use(viewRoutes);

// Rota para renderizar um arquivo Pug
app.get('/index.pug', (req, res) => {
    res.render('index.pug', { title: 'FUNCIONOU ATÉ COM COR!!!', message: 'CARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI' });
});

module.exports = app;
