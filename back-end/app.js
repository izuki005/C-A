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
app.use(express.static(path.join(__dirname, '../Front-End/src/assets')));


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
// app.get('/index.pug', (req, res) => {

//     let teste01 = {
//         nome: "Kawan Gabriel",
//         idade: 20,
//         altura: 1.73
//     }
//     res.render('index.pug', teste01);
// });
//===================================================
app.get('/conteudos', async (req, res) => {
    // Pega o id_conteudo da query string ou usa 1 como padrão
    const id_conteudo = parseInt(req.query.id_conteudo) || 1; 
  
    try {
      const query = `SELECT titulo, descricao FROM conteudos WHERE id_conteudo = @IdConteudo`;
      const result = await global.conn.request()
        .input('IdConteudo', id_conteudo)
        .query(query);
  
      if (result.recordset.length > 0) {
        const conteudo = result.recordset[0];
        res.render('conteudo.pug', { conteudo, id_conteudo });
      } else {
        res.status(404).json({ mensagem: 'Conteúdo não encontrado.' });
      }
    } catch (err) {
      res.status(500).json({ mensagem: 'Erro ao buscar o conteúdo', details: err.message });
    }
  });
    


module.exports = app;
