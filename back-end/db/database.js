const sql = require('mssql');

// na parte de server coloque o nome do servidor de sua máquina
// coloque a senha de seu servidor dentro de password
const config = {
    server: '',
    database: 'CodAg',
    port: 1433,
    user: 'sa',
    password: '',
    trustServerCertificate: true,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1',
            trustServerCertificate: true,
        },
    },
};

async function connectDatabase() {
    try {
        global.conn = await sql.connect(config);
        console.log('Conectado ao banco de dados');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
}

module.exports = {
    connectDatabase,
    sql,
};
