// Função Para mostrar a senha
function mostrarsenha() {
    var passwordField = document.getElementById("cadSenha");
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

// Função para habilitar edição do nome
function habilitarNome() {
    const nome = document.getElementById('confNome');
    
    if (nome.disabled) {
        nome.disabled = false;
        nome.style.color = 'white';
    } else {
        nome.disabled = true;
        nome.style.color = "gray";
        verificar_senha(); // Chama a função para atualizar o usuário
    }
}

// Função para habilitar edição do email
function habilitarEmail() {
    const email = document.getElementById('confEmail');
    
    if (email.disabled) {
        email.disabled = false;
        email.style.color = 'white';
    } else {
        email.disabled = true;
        email.style.color = "gray";
        verificar_senha(); // Chama a função para atualizar o usuário
    }
}

// Função para habilitar edição da senha
function habilitarSenha() {
    const senha = document.getElementById('confSenha');
    if (senha.disabled) {
        senha.disabled = false;
        senha.style.color = "white";
        senha.type = "text"
    } else {
        senha.disabled = true;
        senha.style.color = "gray";
        senha.type = "password"
        
        verificar_senha(); // Chama a função para atualizar o usuário
    }
}
//===========================================
// essa função deve ser chamada após o usuário enviar o email de verificação
async function inserirCodigo() {
    const inCodigo = prompt('Digite o código de verificação que você recebeu em seu e-mail: ');
    try {
        const response = await fetch('http://localhost:3000/email/verificar', {
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

    } catch (error) {
        console.error('Erro ao enviar código:', error);
    }
}

//==========VERIFICADOR DE NOME EMAIL E SENHA PARTE CADASTRO======================

// Adiciona ouvinte de evento de teclado para o campo de nome
// const nomeInput = document.getElementById("cadNome");
// nomeInput.addEventListener('keydown', verificarCamposCad);

// // Adiciona ouvinte de evento de teclado para o campo de email
// const emailInput = document.getElementById("cadEmail");
// emailInput.addEventListener('keydown', verificarCamposCad);

// // Adiciona ouvinte de evento de teclado para o campo de senha
// const senhaInput = document.getElementById("cadSenha");
// senhaInput.addEventListener('keydown', verificarCamposCad);

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



//========================================================================
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
                    const response = await fetch('http://localhost:3000/email/enviar', {
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

//=======================================================================
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
            const response = await fetch('http://localhost:3000/user/cadastrar', {
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
                window.location.href = "login"; // Redireciona para login
                console.log('Usuário cadastrado com sucesso!');
            } else {
                console.error('Erro ao cadastrar usuário:', response.status);
            }
        } catch (error) {
            console.error('Erro na chamada de API:', error);
        }

}
//===================VERIFICADOR DE EMAIL E SENHA CAMPO ENTER PARTE LOGIN ============================

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
//===============================================================

// Função para verificar o usuário
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
            window.location.href = "inicio-jogo";
        } else {
            console.error(responseData.mensagem);
            window.alert(responseData.mensagem);
        }
    } catch (error) {
        console.error('Erro na chamada de API:', error);
        window.alert('Erro na chamada de API');
    }
}

async function carregarInformacoes(userData) {
    try {
        console.log('Dados do usuário recebidos:', userData);

        if (userData && userData.nome && userData.email && userData.senha) {
            // Atribui os valores aos campos HTML
            document.getElementById('confNome').value = userData.nome;
            document.getElementById('confEmail').value = userData.email;
            document.getElementById('confSenha').value = userData.senha;
        } else {
            console.error('Dados do usuário incompletos:', userData);
        }
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

function carregarDados() {
    try {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            carregarInformacoes(userData);
        } else {
            console.error('Dados do usuário não encontrados no armazenamento local');
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário do armazenamento local:', error);
    }
}

// Função para atualizar o usuário no servidor
async function atualizarUsuario(userData) { 
    // Verifica se userData contém id_cadastro
    if (!userData || !userData.id_cadastro) {
        console.error('Dados do usuário incompletos ou id_cadastro não encontrado');
        return;
    }

    try {
        console.log('Dados do usuário:', userData); // Verifica os dados do usuário obtidos do armazenamento local
        const id_cadastro = userData.id_cadastro;

        // Obter os valores dos campos
        const nome = document.getElementById('confNome').value;
        const email = document.getElementById('confEmail').value;
        const senha = document.getElementById('confSenha').value;

        // Verificar se todos os campos estão preenchidos
        if (!nome || !email || !senha) {
            console.error('Por favor, preencha todos os campos');
            window.alert('Por favor, preencha todos os campos');
            return;
        }

        const data = {
            id_cadastro: id_cadastro,
            nome: nome,
            email: email,
            senha: senha
        };

        console.log('Dados a serem enviados para atualização:', data);

        const response = await fetch('http://localhost:3000/user/atualizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Usuário atualizado com sucesso!', responseData);
            window.alert('Usuário atualizado com sucesso!');
            localStorage.setItem('userData', JSON.stringify(data)); // Atualiza os dados do usuário no armazenamento local
        } else {
            console.error('Erro ao atualizar usuário:', responseData.error);
            window.alert(responseData.mensagem);
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        window.alert('Erro ao atualizar usuário');
    }
}

async function verificar_senha() {
    const senhaDigitada = prompt("Digite sua senha:");

    if (!senhaDigitada) {
        console.error('Senha não fornecida');
        return;
    }

    try {
        const data = { senha: senhaDigitada };

        const response = await fetch('http://localhost:3000/user/verificar_senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok) {
            if (responseData.senhaEncontrada) {
                console.log('Senha encontrada. Você pode prosseguir com a atualização.');

                const userDataString = localStorage.getItem('userData');
                if (!userDataString) {
                    console.error('Dados do usuário não encontrados no armazenamento local');
                    return;
                }

                const userData = JSON.parse(userDataString);
                atualizarUsuario(userData);
            } else {
                console.error('Senha não encontrada. Por favor, verifique a senha digitada.');
                window.alert('Senha não encontrada. Por favor, verifique a senha digitada.');
            }
        } else {
            console.error('Erro ao verificar senha:', responseData.error);
            window.alert('Erro ao verificar senha. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar senha:', error);
        window.alert('Erro ao verificar senha. Por favor, tente novamente.');
    }
}

async function excluirConta() {
    const id_cadastro = JSON.parse(localStorage.getItem('userData'))?.id_cadastro;

    if (!id_cadastro) {
        console.error('ID de cadastro não encontrado');
        return;
    }

    if (confirm("Deseja realmente excluir sua conta?")) {
        if (prompt('Para confirmar a exclusão, escreva: Excluir minha conta') === 'Excluir minha conta') {
            try {
                const response = await fetch('http://localhost:3000/user/excluir', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_cadastro: id_cadastro })
                });

                if (response.ok) {
                    alert("Conta excluída com sucesso!");
                    localStorage.removeItem('userData');
                    window.location.href = "login";
                } else {
                    throw new Error('Erro ao excluir a conta');
                }
            } catch (error) {
                alert("Erro ao excluir a conta: " + error.message);
            }
        } else {
            alert("Operação cancelada!");
        }
    }
}

function teste() {
    let deleteButton = document.getElementById("DeleteConta");
    deleteButton.addEventListener('click', excluirConta);
};

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