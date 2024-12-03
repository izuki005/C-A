function verificarCamposLog(event) {
    const emailInput = document.getElementById('logEmail')
    const senhaInput = document.getElementById('logSenha')

    if (event.key === "Enter") {
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (email.length === 0 || senha.length === 0) {
            alert('Por favor, preencha todos os campos.');
        }else{
            verificarUsuario()
        }
    }
}
//================================================================

async function verificarUsuario() {
    const email = document.getElementById('logEmail')?.value;
    const senha = document.getElementById('logSenha')?.value;

    // Validação de campos
    if (!email || !senha) {
        console.error('Preencha todos os campos');
        window.alert('Preencha todos os campos');
        return;
    }

    try {
        // Chamada para a API
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const responseData = await response.json();

        // Verificação da resposta da API
        if (response.ok) {
            const userData = {
                id_cadastro: responseData.id_cadastro,
                nome: responseData.nome,
                email: responseData.email,
                senha: responseData.senha, 
                fases: responseData.fases // Supondo que isso contém a fase atual do banco
            };

            // Limpar a fase atual do Local Storage
            localStorage.removeItem('faseAtual');
            console.log("Fase atual removida do Local Storage.");

            // Atualizar a fase atual com base no banco de dados
            if (userData.fases) {
                localStorage.setItem('faseAtual', userData.fases);
                console.log(`Fase atual atualizada para: ${userData.fases}`);
            }

            // Armazenar os dados do usuário no Local Storage
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Usuário encontrado com sucesso!', userData);
            window.alert('USUÁRIO EXISTENTE');

            // Redireciona o usuário para a página de jogo
            window.location.href = "capa_jogo";
        } else {
            console.error(`Erro: ${responseData.mensagem}`, response.status);
            window.alert(responseData.mensagem);
        }
    } catch (error) {
        console.error('Erro na chamada de API:', error);
        window.alert('Erro na chamada de API');
    }
}

//==========================================================
function mostrarsenha() {
    var passwordField = document.getElementById("logSenha");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}