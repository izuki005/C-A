// Função assíncrona que carrega e desbloqueia os oásis com base nas informações do usuário
async function carregarOasis() {
    try {
        // Obter os dados do usuário do localStorage
        const userDataString = localStorage.getItem('userData');
        
        // Se não houver dados de usuário no localStorage, exibe um erro e encerra a execução
        if (!userDataString) {
            console.error('Dados do usuário não encontrados no armazenamento local');
            return;
        }

        // Parse os dados do usuário (convertendo de string para objeto)
        const userData = JSON.parse(userDataString);

        // Fazer a requisição para obter as informações atualizadas do usuário pelo id_cadastro
        const response = await fetch(`http://localhost:3000/auth/info/${userData.id_cadastro}`);
        
        // Se a resposta não for bem-sucedida, exibe um erro e encerra a execução
        if (!response.ok) {
            console.error('Erro ao buscar informações do usuário:', response.statusText);
            return;
        }

        // Parse da resposta da API, que contém as informações do usuário
        const data = await response.json();
        // Atribui a variável 'fases' com as fases do usuário
        const fases = data.fases;

        // Seleciona todos os elementos DOM que representam os oásis
        const oasisDivs = document.querySelectorAll('.pai-sec__filho-div');
        
        // Se não houver nenhum oásis encontrado, exibe um erro e encerra a execução
        if (oasisDivs.length === 0) {
            console.error('Nenhum oásis encontrado no DOM');
            return;
        }

        // Variável para controlar o desbloqueio dos oásis
        let desbloquear = true;

        // Itera sobre cada oásis no DOM
        oasisDivs.forEach((div, index) => {
            // Seleciona a imagem e o link dentro de cada oásis
            const img = div.querySelector('img');
            const link = div.querySelector('a');

            // Se a imagem não for encontrada, exibe um erro e encerra o processamento deste oásis
            if (!img) {
                console.error('Imagem não encontrada no oásis:', index);
                return;
            }

            // Se for o primeiro oásis ou o oásis deve ser desbloqueado
            if (index === 0 || desbloquear) {
                // Remove a classe 'bloqueado', desbloqueando o oásis
                img.classList.remove('bloqueado');
                if (link) {
                    // Remove a classe 'bloqueado' e o atributo 'onclick' para permitir interações
                    link.classList.remove('bloqueado');
                    link.removeAttribute('onclick');
                }
            } else {
                // Bloqueia os oásis seguintes adicionando a classe 'bloqueado'
                img.classList.add('bloqueado');
                if (link) {
                    // Adiciona a classe 'bloqueado' e impede a interação com o link
                    link.classList.add('bloqueado');
                    link.setAttribute('onclick', 'return false;');
                }
            }

            // Verifica se o oásis atual foi completado
            if (index < fases.length && !fases[index].completada) {
                // Se a fase não foi completada, impede o desbloqueio dos próximos oásis
                desbloquear = false;
            }
        });
    } catch (error) {
        // Caso ocorra algum erro durante o processo, exibe no console
        console.error('Erro ao carregar dados dos oásis:', error);
    }
}

// Adiciona um ouvinte de evento para garantir que a função 'carregarOasis' seja executada
// apenas após o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', carregarOasis);