// Função para cadastrar o usuário
function habilitarNome(){
    const nome = document.getElementById('confNome')
    
    if(nome.disabled){
        nome.disabled = false
        nome.style.color = 'white'
    }else{
        nome.disabled = true
        nome.style.color = "gray"
    }
}
function habilitarEmail(){
    const email = document.getElementById('confEmail')
    
    if(email.disabled){
        email.disabled = false
        email.style.color = 'white'
    }else{
        email.disabled = true
        email.style.color = "gray"
    }
}
function habilitarSenha(){
    const senha = document.getElementById('confSenha')
    
    if(senha.disabled){
        senha.disabled = false
        senha.style.color = "white"
    }else{
        senha.disabled = true
        senha.style.color = "gray"
    }
}
//===========================================



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

async function verificarUsuario() {
    // Obtém os valores dos inputs
    const emailInput = document.getElementById('logEmail').value;
    const senhaInput = document.getElementById('logSenha').value;
    console.log('valores obtidos', emailInput, senhaInput)

    // Verifica se os elementos existem
    if (emailInput && senhaInput) {
        const email = emailInput;
        const senha = senhaInput;

        const data = {
            email: email,
            senha: senha
        };

        console.log('Dados enviados para verificação:', data);

        try {
            const response = await fetch('http://localhost:3000/verificar_login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Resposta da requisição:', response);

            if (response.ok) {
                const userData = await response.json(); // Extrai os dados do usuário da resposta
                console.log('Usuário encontrado com sucesso!', userData);
                window.alert('USUÁRIO EXISTENTE')
                // Salvando informações do usuário localmente
                localStorage.setItem('userData', JSON.stringify(userData));
                window.location.href = "inicio-jogo.html";
            } else {
                console.error('Erro ao procurar usuário:', response.status);
                window.alert('USUÁRIO INEXISTENTE');
            }
        } catch (error) {
            console.error('Erro na chamada de API:', error);
        }
    } else {
        console.error('Elementos de entrada não encontrados.');
    }
}

 // Função para carregar informações do usuário
async function carregarInformacoes(userData) {
    try {
        // Verifica se userData é um objeto válido e possui as propriedades necessárias
        if (userData && userData.nome && userData.email && userData.senha) {
            document.getElementById('confNome').value = userData.nome;
            document.getElementById('confEmail').value = userData.email;
            document.getElementById('confSenha').value = userData.senha;
        } else {
            console.error('Dados do usuário inválidos:', userData);
        }
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

// Carrega as informações do usuário quando a página é carregada
function carregarDados() {
    // Obter os dados salvos no localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    // Chamar a função para carregar as informações
    carregarInformacoes(userData);
};