const app = require('./app');
const { connectDatabase } = require('./db/database');

const port = 3000;

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}/login`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
