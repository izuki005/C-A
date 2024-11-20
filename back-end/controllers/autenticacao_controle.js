const crypto = require('crypto');

// Função para verificar login do usuário
async function verificarLogin(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Email ou senha não foram fornecidos na solicitação.' });
    }

    try {
        const hashedSenha = crypto.createHash('md5').update(senha).digest('hex'); // Criptografa a senha

        const checkLoginQuery = `
            SELECT id_cadastro, nome, email 
            FROM cadastro 
            WHERE email = @Email AND senha = @Senha
        `;

        const result = await global.conn.request()
            .input('Email', email)
            .input('Senha', hashedSenha) // Comparando senha criptografada
            .query(checkLoginQuery);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            
            // Retornando a senha original em vez da hash
            user.senha = senha

            // Buscar as fases do usuário
            const fases = await buscarFasesUsuario(user.id_cadastro);

            return res.status(200).json({ ...user, fases });
        } else {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
    } catch (err) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
}

// Função para buscar as fases (completadas e não completadas) de um usuário
async function buscarFasesUsuario(id_cadastro) {
    try {
        // Consulta para obter as fases do usuário
        const query = `
            SELECT 
                F.nome AS nome_fase,
                UF.completada
            FROM 
                UsuarioFase UF
            JOIN 
                Fases F ON UF.id_fase = F.id_fase
            WHERE 
                UF.id_cadastro = @id_cadastro
        `;

        const result = await global.conn.request()
            .input('id_cadastro', id_cadastro)
            .query(query);

        return result.recordset;
    } catch (err) {
        console.error('Erro ao buscar fases:', err);
        throw err;
    }
}


// Função para obter informações do usuário por id_cadastro
async function obterInformacoesUsuario(req, res) {
    const { id_cadastro } = req.params;

    if (!id_cadastro) {
        return res.status(400).json({ mensagem: 'ID de cadastro não foi fornecido.' });
    }

    try {
        const getUserQuery = `
            SELECT id_cadastro, nome, email 
            FROM cadastro 
            WHERE id_cadastro = @id_cadastro
        `;

        const userResult = await global.conn.request()
            .input('id_cadastro', id_cadastro)
            .query(getUserQuery);

        if (userResult.recordset.length > 0) {
            const user = userResult.recordset[0];

            // Busca as fases do usuário
            const fases = await buscarFasesUsuario(user.id_cadastro);

            // Retorna as informações do usuário junto com as fases
            return res.status(200).json({ ...user, fases });
        } else {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.error('Erro ao obter informações do usuário:', err);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
}

module.exports = {
    verificarLogin,
    buscarFasesUsuario,
    obterInformacoesUsuario,
};