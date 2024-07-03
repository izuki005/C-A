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

    if (!email || !senha) {
        console.error('Preencha todos os campos');
        window.alert('Preencha todos os campos');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const responseData = await response.json();

        if (response.ok) {
            const userData = {
                id_cadastro: responseData.id_cadastro, // Corrigido para id_cadastro
                nome: responseData.nome,
                email: responseData.email,
                senha: responseData.senha
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Usuário encontrado com sucesso!', userData);
            window.alert('USUÁRIO EXISTENTE');
            window.location.href = "capa_jogo.html";
        } else {
            console.error(responseData.mensagem);
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