const db = require('../db/database');

// Função para completar a fase
async function completarFase(req, res) {
    const { id_fase, id_cadastro } = req.body; // Pega o ID da fase e do usuário do corpo da requisição

    try {
        // Cria uma nova requisição SQL
        const request = new db.sql.Request();
        request.input('id_cadastro', db.sql.Int, id_cadastro);
        request.input('id_fase', db.sql.Int, id_fase);

        // Consulta para verificar se a fase está disponível e seu status
        const resultFase = await request.query(
            `SELECT completada FROM UsuarioFase WHERE id_cadastro = @id_cadastro AND id_fase = @id_fase`
        );

        // Verifica se a fase foi encontrada
        const fase = resultFase.recordset[0];
        if (!fase) {
            return res.status(404).json({ message: 'Fase não encontrada ou não disponível para o usuário' });
        }

        // Verifica se a fase já foi completada
        if (fase.completada) {
            return res.status(200).json({ message: 'Fase já foi completada anteriormente.' });
        }

        // Atualiza o status da fase para completa
        await request.query(
            `UPDATE UsuarioFase SET completada = 1, data_completada = GETDATE() WHERE id_cadastro = @id_cadastro AND id_fase = @id_fase`
        );

        return res.status(200).json({ message: 'Fase completada com sucesso!' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor', error });
    }
}

module.exports = { completarFase };