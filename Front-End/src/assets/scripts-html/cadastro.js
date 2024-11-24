// Função para verificar campos ao pressionar Enter
function verificarCamposCad(event) {
    const nomeInput = document.getElementById('cadNome');
    const emailInput = document.getElementById('cadEmail');
    const senhaInput = document.getElementById('cadSenha');

    if (event.key === "Enter") {
        event.preventDefault(); // Evita o envio padrão do formulário
        
        // Recupera valores e verifica campos vazios
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        if (!nome || !email || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Se todos os campos forem preenchidos, envia o e-mail
        enviarEmail();
    }
}

// Função para enviar o e-mail com validação
async function enviarEmail() {
    const email = document.getElementById('cadEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/email/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao enviar email: ${errorMessage}`);
        }

        const result = await response.text();
        console.log(result);

        // Abre o modal para inserção do código
        modal();
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        if (error.message.includes('Este email já está cadastrado')) {
            alert('Este email já está cadastrado. Por favor, use outro email.');
        } else {
            alert('Erro ao enviar email. Por favor, tente novamente mais tarde.');
        }
    }
}

// Função para abrir e fechar o modal
function modal() {
    const div = document.getElementById("modal");
    div.classList.toggle('hidden');
    div.classList.toggle('fade');
}

// Função para inserir e validar o código
async function inserirCodigo() {
    const inCodigo = document.getElementById('cod').value.trim();

    if (!inCodigo) {
        alert('Por favor, insira o código.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/email/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inCodigo }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao verificar código: ${errorMessage}`);
        }

        const result = await response.text();
        console.log(result);

        if (result === 'Código verificado com sucesso!') {
            cadastrarUsuario();
        } else {
            alert('Código inválido. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar código:', error);
    }
    modal();
}

// Função para cadastrar usuário
async function cadastrarUsuario() {
    const nome = document.getElementById('cadNome').value.trim();
    const email = document.getElementById('cadEmail').value.trim();
    const senha = document.getElementById('cadSenha').value.trim();

    try {
        const response = await fetch('http://localhost:3000/user/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (response.ok) {
            alert('Cadastro Realizado com Sucesso!');
            document.getElementById('cadNome').value = '';
            document.getElementById('cadEmail').value = '';
            document.getElementById('cadSenha').value = '';
            window.location.href = "login"; // Redireciona para a página de login
        } else {
            alert('Erro ao cadastrar usuário.');
            console.error('Erro ao cadastrar usuário:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
    }
}

// Função para mostrar/ocultar senha
function mostrarsenha() {
    const passwordField = document.getElementById("cadSenha");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}