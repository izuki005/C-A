const planetas = [
    { nome: 'Deserto', imagem: '../../assets/imgs-html/M-deserto.png', desbloqueado: true, link: 'oasis' },
    { nome: 'Gelo', imagem: '../../assets/imgs-html/M-gelo.png', desbloqueado: false },
    { nome: 'Floresta', imagem: '../../assets/imgs-html/M-floresta.png', desbloqueado: false },
    { nome: 'Vulcão', imagem: '../../assets/imgs-html/M-vulcão.png', desbloqueado: false }
];

let indiceAtual = 0;

const imgPlaneta = document.getElementById('imagem-planeta');
const linkPlaneta = document.getElementById('link-planeta');
const setaEsquerda = document.getElementById('seta-esquerda');
const setaDireita = document.getElementById('seta-direita');

// Função para atualizar a exibição do planeta
function atualizarPlaneta() {
    const planetaAtual = planetas[indiceAtual];
    imgPlaneta.src = planetaAtual.imagem;
    imgPlaneta.alt = planetaAtual.nome;

    // Atualiza o estado do planeta
    if (planetaAtual.desbloqueado) {
        imgPlaneta.classList.remove('bloqueado');  // Remove a classe bloqueado para planetas desbloqueados
        linkPlaneta.href = planetaAtual.link || '#';  // Adiciona o link para o planeta
        linkPlaneta.style.pointerEvents = 'auto';  // Permite interação (link clicável)
    } else {
        imgPlaneta.classList.add('bloqueado');  // Adiciona a classe bloqueado para planetas bloqueados
        linkPlaneta.href = '#';  // Bloqueia o link
        linkPlaneta.style.pointerEvents = 'none';  // Desabilita o clique no planeta bloqueado
    }
}

// Evento para mudar para o planeta anterior
setaEsquerda.addEventListener('click', () => {
    indiceAtual = (indiceAtual - 1 + planetas.length) % planetas.length;
    atualizarPlaneta();
});

// Evento para mudar para o próximo planeta
setaDireita.addEventListener('click', () => {
    indiceAtual = (indiceAtual + 1) % planetas.length;
    atualizarPlaneta();
});

// Chamada inicial para exibir o primeiro planeta
atualizarPlaneta();