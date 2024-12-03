const sql = require('mssql');

const config = {
    server: 'matheus004',
    database: 'CodAg',
    port: 1433,
    user: 'sa',
    password: 'jogo21',
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
