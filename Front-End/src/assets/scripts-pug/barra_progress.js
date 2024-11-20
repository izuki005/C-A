// Função principal para atualizar a barra de progresso e completar as fases
async function atualizarBarraDeProgresso() {
    // Seleciona a barra de progresso na interface
    const barraProgresso = document.getElementById('barra-progresso');
    
    // Define o número total de conteúdos por fase
    const totalConteudosFase1 = 14;
    const totalConteudosFase2 = 8;
    const totalConteudosFase3 = 6;
    const totalConteudos = totalConteudosFase1 + totalConteudosFase2 + totalConteudosFase3;

    // Calcula o progresso com base na fase atual
    let progresso = calcularProgresso(totalConteudosFase1, totalConteudosFase2, totalConteudosFase3);

    // Atualiza a largura da barra de progresso para refletir o progresso calculado
    barraProgresso.style.width = `${progresso}%`;

    // Obtém os dados do usuário para verificar se ele completou alguma fase
    const userData = obterDadosUsuario();
    if (userData) {
        // Se o usuário estiver registrado, verifica e completa a fase apropriada
        await completarFase(userData);
    }
}

// Função para calcular o progresso com base no conteúdo atual e nas fases
function calcularProgresso(totalConteudosFase1, totalConteudosFase2, totalConteudosFase3) {
    let progresso = 0;
    
    // Verifica em qual fase o conteúdo atual se encontra e calcula o progresso
    if (idConteudo <= totalConteudosFase1) {
        progresso = (idConteudo / totalConteudosFase1) * 100;  // Fase 1
    } else if (idConteudo <= totalConteudosFase1 + totalConteudosFase2) {
        progresso = ((idConteudo - totalConteudosFase1) / totalConteudosFase2) * 100;  // Fase 2
    } else if (idConteudo > totalConteudosFase1 + totalConteudosFase2) {
        progresso = ((idConteudo - totalConteudosFase1 - totalConteudosFase2) / totalConteudosFase3) * 100;  // Fase 3
    }

    // Retorna o valor de progresso calculado
    return progresso;
}

// Função para obter os dados do usuário armazenados no localStorage
function obterDadosUsuario() {
    const userDataString = localStorage.getItem('userData');
    
    // Verifica se os dados do usuário existem no localStorage
    if (userDataString) {
        return JSON.parse(userDataString);  // Retorna os dados do usuário em formato JSON
    }
    return null;  // Caso não exista, retorna null
}

// Função para verificar se o usuário completou alguma fase e chamar a API para marcar como concluída
async function completarFase(userData) {
    // Verifica em qual fase o usuário está com base no idConteudo
    if (idConteudo === 14) {
        // Se o conteúdo é o final da Fase 1, chama a API para marcar a Fase 1 como concluída
        await completarFaseAPI(1, userData.id_cadastro);
    } else if (idConteudo === 22) {
        // Se o conteúdo é o final da Fase 2, chama a API para marcar a Fase 2 como concluída
        await completarFaseAPI(2, userData.id_cadastro);
    } else if (idConteudo === 28) {
        // Se o conteúdo é o final da Fase 3, chama a API para marcar a Fase 3 como concluída
        await completarFaseAPI(3, userData.id_cadastro);
    }
}

// Função para enviar a requisição para a API e completar a fase
async function completarFaseAPI(fase, id_cadastro) {
    try {
        // Envia uma requisição POST para a API para completar a fase
        const response = await fetch('http://localhost:3000/fase/completar_fase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_fase: fase, id_cadastro: id_cadastro })
        });

        // Se a requisição for bem-sucedida, imprime no console a confirmação da fase concluída
        if (response.ok) {
            console.log(`Fase ${fase} concluída!`);
        }
    } catch (error) {
        // Caso ocorra um erro durante a requisição, imprime uma mensagem de erro
        console.error(`Erro ao completar fase ${fase}:`, error);
    }
}

// Adiciona um ouvinte de evento para carregar o progresso quando a página for carregada
window.addEventListener('load', atualizarBarraDeProgresso);