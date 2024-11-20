async function carregarOasis() {
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
        if (!response.ok) {
            console.error('Erro ao buscar informações do usuário:', response.statusText);
            return;
        }

        const data = await response.json();
        const fases = data.fases;

        // Seleciona todos os elementos DOM que representam os oásis e pontos
        const oasisDivs = document.querySelectorAll('.pai-sec__filho-div');
        const pontos = document.querySelectorAll('.filho-div__ponto');
        
        if (oasisDivs.length === 0 || pontos.length === 0) {
            console.error('Nenhum oásis ou ponto encontrado no DOM');
            return;
        }

        let desbloquear = true; // Controle de desbloqueio
        let ultimoDesbloqueadoIndex = 0; // Índice do último oásis desbloqueado

        // Itera sobre cada oásis no DOM
        oasisDivs.forEach((div, index) => {
            const img = div.querySelector('img');
            const link = div.querySelector('a');

            if (!img) {
                console.error('Imagem não encontrada no oásis:', index);
                return;
            }

            if (index === 0 || desbloquear) {
                img.classList.remove('bloqueado');
                if (link) {
                    link.classList.remove('bloqueado');
                    link.removeAttribute('onclick');
                }
                ultimoDesbloqueadoIndex = index; // Atualiza o último desbloqueado
            } else {
                img.classList.add('bloqueado');
                if (link) {
                    link.classList.add('bloqueado');
                    link.setAttribute('onclick', 'return false;');
                }
            }

            if (index < fases.length && !fases[index].completada) {
                desbloquear = false; // Impede o desbloqueio de próximos oásis
            }
        });

        // Conectar os pontos para todos os oásis desbloqueados
        await conectarPontos(pontos, ultimoDesbloqueadoIndex); // Agora é uma função assíncrona

    } catch (error) {
        console.error('Erro ao carregar dados dos oásis:', error);
    }
}

async function conectarPontos(pontos, ultimoIndex) {
    const svgContainer = document.querySelector('section');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'lines');
    svg.setAttribute('width', `${svgContainer.offsetWidth}px`);
    svg.setAttribute('height', `${svgContainer.offsetHeight}px`);
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.zIndex = '0';
    svgContainer.appendChild(svg);

    // Função para criar e animar uma linha SVG
    function createLine(x1, y1, x2, y2) {
        return new Promise((resolve) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', 'white');
            line.setAttribute('stroke-width', '2');

            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            line.setAttribute('stroke-dasharray', length);
            line.setAttribute('stroke-dashoffset', length);

            svg.appendChild(line);

            // Quando a animação de desenhar a linha terminar, resolvemos a promise
            setTimeout(() => {
                line.style.transition = 'stroke-dashoffset 1s linear';
                line.setAttribute('stroke-dashoffset', '0');
            }, 100);

            // Aguarda o término da animação antes de continuar
            setTimeout(resolve, 1100); // Espera a animação de 1 segundo para a linha
        });
    }

    // Conecta os pontos de todos os oásis desbloqueados de forma sequencial
    for (let i = 0; i < ultimoIndex; i++) {
        const pontoAtual = pontos[i].getBoundingClientRect();
        const pontoProximo = pontos[i + 1].getBoundingClientRect();

        const x1 = pontoAtual.left + pontoAtual.width / 2 - svgContainer.offsetLeft;
        const y1 = pontoAtual.top + pontoAtual.height / 2 - svgContainer.offsetTop;
        const x2 = pontoProximo.left + pontoProximo.width / 2 - svgContainer.offsetLeft;
        const y2 = pontoProximo.top + pontoProximo.height / 2 - svgContainer.offsetTop;

        // Espera a animação da linha anterior antes de desenhar a próxima
        await createLine(x1, y1, x2, y2); // Agora, a animação será aguardada antes de passar para a próxima linha
    }
}

// Garantir que carregarOasis seja executado após o DOM estar pronto
document.addEventListener('DOMContentLoaded', carregarOasis);

window.addEventListener('resize', function() {
    location.reload();  // Recarrega a página para garantir o ajuste correto da tela
});