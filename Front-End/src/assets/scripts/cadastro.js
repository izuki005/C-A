async function enviarEmail() {
    const nome = document.getElementById('cadNome').value;
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;
    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/; // Exemplo da senha: Jogo!123
    
    if (nome.length === 0 || email.length === 0 || senha.length === 0) {
        alert('Por favor, preencha todos os campos.');
    } else {
        // Verifica se o formato do email é válido
        if (emailRegex.test(email)) {
            if (senhaRegex.test(senha)) {
                try {
                    const response = await fetch('http://localhost:3000/enviar-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    });
                    
                    if (!response.ok) {
                        const errorMessage = await response.text();
                        throw new Error(`Erro ao enviar email: ${errorMessage}`);
                    }

                    const result = await response.text();
                    console.log(result);
                    // Abrir a função inserirCodigo após o envio bem-sucedido do email
                    inserirCodigo();

                } catch (error) {
                    console.error('Erro ao enviar email:', error);
                }
            } else {
                alert('Essa senha que você digitou não é valida, segue o exemplo: Jogo!123');
            }
        } else {
            alert('Por favor, insira um email válido.');
        }
    }
}
//=======================================================================================================

function modal(){
    const div = document.getElementById("modal");
        if (div.classList.contains('fade')){
            div.classList.remove('fade')
            div.classList.add('hidden')
        } else {
            div.classList.add('fade')
            div.classList.remove('hidden')
        }
        setTimeout(() => {
            if (div.classList.contains('fade')){
            div.classList.add('in')
            } else {
            div.classList.remove('in')
            }
        }, 100);
}
//=======================================================================================================

async function inserirCodigo() {
    // const inCodigo = prompt('Digite o código de verificação que você recebeu em seu e-mail: ');
    const inCodigo = document.getElementById('cod').value
    try {
        if (inCodigo.length > 0){
            
            const response = await fetch('http://localhost:3000/verificarHash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inCodigo })
            });
            
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Erro ao verificar código: ${errorMessage}`);
            }
            
            const result = await response.text();
            console.log(result);
            
            // Lógica para tratar a resposta da rota
            if (result === 'Código verificado com sucesso!') {
                // Aqui você pode realizar ações adicionais após a validação do código
                cadastrarUsuario()
            } else {
                console.log('Código inválido. Por favor, tente novamente.');
                // Aqui você pode lidar com o caso em que o código inserido não corresponde ao esperado
            }
        }
        
    } catch (error) {
        console.error('Erro ao enviar código:', error);
    }
    modal()
}
//================================================================================================

async function cadastrarUsuario() {
    // Obtém os valores dos inputs
    const nome = document.getElementById('cadNome').value
    const email = document.getElementById('cadEmail').value
    const senha = document.getElementById('cadSenha').value
    // Constrói o objeto de dados a ser enviado para o servidor
    const data = {
        nome: nome,
        email: email,
        senha: senha
    };
        // Aqui você pode enviar o formulário ou fazer qualquer outra coisa que desejar
        try {
            //Realiza a chamada de API usando o método fetch
            const response = await fetch('http://localhost:3000/cadastro_usuario', {
                method: 'POST', // Método HTTP para a solicitação
                headers: {
                    'Content-Type': 'application/json', // Tipo de conteúdo enviado (JSON)
                },
                body: JSON.stringify(data), // Converte o objeto em formato JSON
            });
    
            // Verifica se a solicitação foi bem-sucedida (status 2xx)
            if (response.ok) {
                document.getElementById('cadNome').value = ''; // Limpa o campo nome
                document.getElementById('cadEmail').value = ''; // Limpa o campo email
                document.getElementById('cadSenha').value = ''; // Limpa o campo senha
                window.alert('Cadastro Realizado')
                window.location.href = "login.html"; // Redireciona para login.html
                console.log('Usuário cadastrado com sucesso!');
            } else {
                console.error('Erro ao cadastrar usuário:', response.status);
            }
        } catch (error) {
            console.error('Erro na chamada de API:', error);
        }

}
//==================================================================================

function verificarCamposCad(event) {
    const nomeInput = document.getElementById('cadNome')
    const emailInput = document.getElementById('cadEmail')
    const senhaInput = document.getElementById('cadSenha')

    if (event.key === "Enter") {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (nome.length === 0 || email.length === 0 || senha.length === 0) {
            alert('Por favor, preencha todos os campos.');
        }else{
        }
    }
}
//======================================================================================

function mostrarsenha() {
    var passwordField = document.getElementById("cadSenha");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}
//========================================================================

