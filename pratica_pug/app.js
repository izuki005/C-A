const express = require('express');
const app = express();

// Configuração do diretório de views e motor de renderização
app.set('views', './views');
app.set('view engine', 'pug');
//define um middleware para o fornecimento de arquivos estáticos
app.use(express.static('public'))
// Importa as rotas do arquivo rotas.js
app.get('/', (req, res) => {
    objeto = ['valor 1', 'valor 2', 'valor 3']
    res.render('index', {objeto: objeto})
})
app.get('/page2', (req, res) => {
    res.render('page2')
})

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Seu servidor está rodando na porta http://localhost:3000');
});

module.exports = app;
