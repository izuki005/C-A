async function carregarDados() {
    try {
        // Obter os dados do usuário do localStorage
        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            console.error('Dados do usuário não encontrados no armazenamento local');
            return;
        }

        const userData = JSON.parse(userDataString);

        // Fazer a requisição para obter as informações atualizadas do usuário pelo id_cadastro
        const response = await fetch(`http://localhost:3000/auth/info/${userData.id_cadastro}`);
        if (response.ok) {
            const userDataAtualizado = await response.json();

            // Atualizar o localStorage com os dados mais recentes do usuário
            localStorage.setItem('userData', JSON.stringify(userDataAtualizado));

            // Carregar as informações do usuário na interface
            carregarInformacoes(userDataAtualizado);
        } else {
            console.error('Erro ao buscar informações atualizadas do usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário do armazenamento local:', error);
    }
}
//============================================================================================

async function carregarInformacoes(userData) {
    try {
        console.log('Dados do usuário recebidos:', userData);

        if (userData && userData.nome && userData.email) { // Remova senha se não for necessário
            // Atribui os valores aos campos HTML
            document.getElementById('confNome').value = userData.nome;
            document.getElementById('confEmail').value = userData.email;
            document.getElementById('confSenha').value = userData.senha; // Considere não armazenar a senha

            // Verifica se o usuário tem as fases no userData
            if (userData.fases && Array.isArray(userData.fases)) {
                // Filtra as fases completadas
                const fasesCompletadas = userData.fases.filter(fase => fase.completada);

                // Exibe a quantidade de fases completadas
                const quantidadeCompletadas = fasesCompletadas.length;
                console.log(`Fases completadas: ${quantidadeCompletadas}`);

                // Exibe essa quantidade em um campo HTML
                document.getElementById('fasesCompletadas').innerText = `Fases completadas: ${quantidadeCompletadas}`;
            } else {
                console.warn('Nenhuma fase encontrada para o usuário.');
                document.getElementById('fasesCompletadas').innerText = 'Fases completadas: 0';
            }
        } else {
            console.error('Dados do usuário incompletos:', userData);
            // Adicione um feedback visual para o usuário, se necessário
        }
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
        // Adicione um feedback visual para o usuário, se necessário
    }
}
//============================================================================================

function teste() {
    let deleteButton = document.getElementById("DeleteConta");
    deleteButton.addEventListener('click', excluirConta);
};
//==============================================================================================

async function excluirConta() {
    const userDataString = localStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    if (!userData || !userData.id_cadastro) {
        console.error('ID de cadastro não encontrado');
        return;
    }

    if (confirm("Deseja realmente excluir sua conta?")) {
        const confirmation = prompt('Para confirmar a exclusão, escreva: Excluir minha conta');
        if (confirmation === 'Excluir minha conta') {
            try {
                const response = await fetch('http://localhost:3000/user/excluir', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_cadastro: userData.id_cadastro })
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

//=====================================================================================
function voltarPaginaAnterior() {
    const referrer = document.referrer; // Pega a URL da página anterior
    if (referrer) {
        window.location.href = referrer; // Volta para a página anterior
    } else {
        window.location.href = '/inicio-jogo'; // Fallback para a página inicial
    }
}