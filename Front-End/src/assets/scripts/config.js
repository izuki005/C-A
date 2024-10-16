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
//============================================================================================

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
//============================================================================================

function teste() {
    let deleteButton = document.getElementById("DeleteConta");
    deleteButton.addEventListener('click', excluirConta);
};
//==============================================================================================

async function excluirConta() {
    const id_cadastro = JSON.parse(localStorage.getItem('userData'))?.id_cadastro;

    if (!id_cadastro) {
        console.error('ID de cadastro não encontrado');
        return;
    }

    if (confirm("Deseja realmente excluir sua conta?")) {
        if (prompt('Para confirmar a exclusão, escreva: Excluir minha conta') === 'Excluir minha conta') {
            try {
                const response = await fetch('http://localhost:3000/apagar_usuario', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_cadastro: id_cadastro })
                });

                if (response.ok) {
                    alert("Conta excluída com sucesso!");
                    localStorage.removeItem('userData');
                    window.location.href = "login.html";
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
//============================================================================================

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
//========================================================================

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
//=========================================================================

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
//=======================================================================
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
//=====================================================================================

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