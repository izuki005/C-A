// Função para verificar campos ao pressionar Enter
function verificarCamposCad(event) {
    console.log("Evento detectado:", event.key);

    if (event.key === "Enter") {
        event.preventDefault(); // Evita o envio padrão do formulário
        enviarEmail();
    }
}

// Função para enviar o e-mail com validação
async function enviarEmail() {
    const nome = document.getElementById('cadNome').value.trim();
    const email = document.getElementById('cadEmail').value.trim();
    const senha = document.getElementById('cadSenha').value.trim();

    // Verifica campos vazios
    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Valida formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    console.log("Validando email:", email);

    try {
        console.log("Enviando requisição para enviar email...");
        const response = await fetch('http://localhost:3000/email/enviar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const result = await response.text();
        console.log("Resultado do envio de email:", result);

        // Abre o modal para inserção do código
        modal();
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        alert('Erro ao enviar email. Tente novamente.');
    }
}

// Função para abrir e fechar o modal
function modal() {
    const div = document.getElementById("modal");
    div.classList.toggle("hidden");
    div.classList.toggle("fade");
}

// Função para inserir e validar o código
async function inserirCodigo() {
    const inCodigo = document.getElementById('cod').value.trim();

    if (!inCodigo) {
        alert('Por favor, insira o código.');
        return;
    }

    try {
        console.log("Enviando código para validação...");
        const response = await fetch('http://localhost:3000/email/verificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inCodigo }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const result = await response.text();
        console.log("Resultado da verificação do código:", result);

        if (result === 'Código verificado com sucesso!') {
            cadastrarUsuario();
        } else {
            alert('Código inválido. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao verificar código:', error);
        alert('Erro ao verificar código.');
    }

    modal(); // Fecha o modal
}

// Função para cadastrar usuário
async function cadastrarUsuario() {
    const nome = document.getElementById('cadNome').value.trim();
    const email = document.getElementById('cadEmail').value.trim();
    const senha = document.getElementById('cadSenha').value.trim();

    try {
        console.log("Enviando dados para cadastro...");
        const response = await fetch('http://localhost:3000/user/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = "login"; // Redireciona para a página de login
        } else {
            alert('Erro ao cadastrar usuário.');
            console.error('Erro ao cadastrar usuário:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Tente novamente.');
    }
}

// Função para mostrar/ocultar senha
function mostrarsenha() {
    const passwordField = document.getElementById("cadSenha");
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}