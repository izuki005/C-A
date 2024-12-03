const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth_rota');
const emailRoutes = require('./routes/email_rota');
const userRoutes = require('./routes/user_rota');
const faseRoutes = require('./routes/fases_rota');

const app = express();

app.use(express.json());
app.use(cors());

// Serve arquivos estáticos
app.use(express.static(path.join(__dirname, '../Front-End/src')));
app.use(express.static(path.join(__dirname, '../Front-End/src/views')));
app.use(express.static(path.join(__dirname, '../Front-End/src/assets')));


// Configuração do template engine
app.set('views', path.join(__dirname, '../Front-End/src/views/templates'));
// app.set('views', path.join(__dirname, '../Front-End/src/views/templates/includes'));
app.set('view engine', 'pug');

// Rotas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/email', emailRoutes);
app.use('/fase',faseRoutes);

// Importar o arquivo de rotas
const viewRoutes = require('./routes/view_routes');

// Usar as rotas
app.use(viewRoutes);

// Rota para renderizar um arquivo Pug
app.get('/conteudos-atividades', async (req, res) => {
  const id_conteudo = parseInt(req.query.id_conteudo) || 8; // Usa o valor da query string ou 8 como padrão
  try {
      const query = `SELECT titulo, descricao FROM conteudos WHERE id_conteudo = @IdConteudo`;
      const result = await global.conn.request()
          .input('IdConteudo', id_conteudo)
          .query(query);

      if (result.recordset.length > 0) {
          const conteudo = result.recordset[0];

          // Substitui as quebras de linha na descrição por <br>
          conteudo.descricao = conteudo.descricao.replace(/\n/g, '<br>')
          conteudo.titulo = conteudo.titulo.replace(/\n/g, '<br>');

          res.render('layout-atividade.pug', { conteudo, id_conteudo});
      } else {
          res.status(404).json({ mensagem: 'Conteúdo não encontrado.' });
      }
  } catch (err) {
      res.status(500).json({ mensagem: 'Erro ao buscar o conteúdo', details: err.message });
  }
});
app.get('/conteudos-check', async (req, res) => {
  // O id_conteudo pode vir da query string ou um valor padrão (aqui estou usando 8 como exemplo)
  const id_conteudo = parseInt(req.query.id_conteudo) || 21; // Padrão: 8

  try {
      // Consulta ao banco de dados (adaptada ao seu modelo)
      const query = `SELECT titulo, descricao FROM conteudos WHERE id_conteudo = @IdConteudo`;

      const result = await global.conn.request()
          .input('IdConteudo', id_conteudo)
          .query(query);

      // Verifica se encontrou o conteúdo
      if (result.recordset.length > 0) {
          const conteudo = result.recordset[0];

          // Substitui as quebras de linha por <br> para exibir no Pug
          conteudo.descricao = conteudo.descricao.replace(/\n/g, '<br>');
          conteudo.titulo = conteudo.titulo.replace(/\n/g, '<br>');

          // Renderiza o template Pug e passa os dados do conteúdo
          res.render('layout-check.pug', { conteudo, id_conteudo });
      } else {
          // Caso não encontre o conteúdo
          res.status(404).json({ mensagem: 'Conteúdo não encontrado.' } );
      }
  } catch (err) {
      // Se houver algum erro na consulta ao banco de dados
      res.status(500).json({ mensagem: 'Erro ao buscar o conteúdo', details: err.message });
  }
});



app.get('/conteudos-imgs', async (req, res) => {
  // Obtém o id_conteudo da query string ou usa 4 como padrão
  const id_conteudo = parseInt(req.query.id_conteudo) || 4;

  try {
      const query = `SELECT titulo, descricao FROM conteudos WHERE id_conteudo = @IdConteudo`;
      const result = await global.conn.request()
          .input('IdConteudo', id_conteudo)
          .query(query);

      if (result.recordset.length > 0) {
          const conteudo = result.recordset[0];

          // Substitui as quebras de linha na descrição por <br>
          conteudo.descricao = conteudo.descricao.replace(/\n/g, '<br>')
          conteudo.titulo = conteudo.titulo.replace(/\n/g, '<br>');

          res.render('layout-imgs.pug', { conteudo, id_conteudo });
      } else {
          res.status(404).json({ mensagem: 'Conteúdo não encontrado.' });
      }
  } catch (err) {
      res.status(500).json({ mensagem: 'Erro ao buscar o conteúdo', details: err.message });
  }
});


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

      // Substitui as quebras de linha na descrição por <br>
      conteudo.descricao = conteudo.descricao.replace(/\n/g, '<br>');
      conteudo.titulo = conteudo.titulo.replace(/\n/g, '<br>');

      res.render('layout-conteudo.pug', { conteudo, id_conteudo });
    } else {
      res.status(404).json({ mensagem: 'Conteúdo não encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar o conteúdo', details: err.message });
  }
});
    


module.exports = app;