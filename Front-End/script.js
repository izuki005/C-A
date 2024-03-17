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
    } else {
        senha.disabled = true;
        senha.style.color = "gray";
        verificar_senha(); // Chama a função para atualizar o usuário
    }
}

//===========================================

async function cadastrarUsuario() {
    // Obtém os valores dos inputs
    const nome = document.getElementById('cadNome').value;
    const email = document.getElementById('cadEmail').value;
    const senha = document.getElementById('cadSenha').value;

    // Constrói o objeto de dados a ser enviado para o servidor
    const data = {
        nome: nome,
        email: email,
        senha: senha
    };

    try {
        // Realiza a chamada de API usando o método fetch
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
            window.alert('Cadastro Realizado');
            window.location.href = "login.html"; // Redireciona para login.html
            console.log('Usuário cadastrado com sucesso!');
        } else {
            console.error('Erro ao cadastrar usuário:', response.status);
        }
    } catch (error) {
        console.error('Erro na chamada de API:', error);
    }
}

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
        const response = await fetch('http://localhost:3000/verificar_login', {
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
            window.location.href = "inicio-jogo.html";
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
async function atualizarUsuario(userData) { // Adiciona userData como parâmetro
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

        console.log('Dados a serem enviados para atualização:', data); // Verifica os dados a serem enviados para atualização

        const response = await fetch('http://localhost:3000/atualizar_usuario', {
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

        const response = await fetch('http://localhost:3000/verificar_senha', {
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
                atualizarUsuario(userData); // Passa os dados do usuário como parâmetro para a função atualizarUsuario
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