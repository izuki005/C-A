const planetas = [
    { nome: 'Deserto', imagem: '../../assets/imgs-html/M-deserto.png', desbloqueado: true, link: 'oasis' },
    { nome: 'Gelo', imagem: '../../assets/imgs-html/M-gelo.png', desbloqueado: false },
    { nome: 'Floresta', imagem: '../../assets/imgs-html/M-floresta.png', desbloqueado: false },
    { nome: 'Vulcão', imagem: '../../assets/imgs-html/M-vulcao.png', desbloqueado: false }
];

const sombras = [
    { nome: 'Deserto-mini', imagem: '../../assets/imgs-html/M-deserto-mini.png' },
    { nome: 'Gelo-mini', imagem: '../../assets/imgs-html/M-gelo-mini.png' },
    { nome: 'Floresta-mini', imagem: '../../assets/imgs-html/M-floresta-mini.png' },
    { nome: 'Vulcão-mini', imagem: '../../assets/imgs-html/M-vulcao-mini.png' }
];

let indiceAtual = 0;

// Elementos do DOM
const miniPlanetas = document.getElementById('espelho'); // Contém as sombras
const imgPlaneta = document.getElementById('imagem-planeta');
const linkPlaneta = document.getElementById('link-planeta');
const setaEsquerda = document.getElementById('seta-esquerda');
const setaDireita = document.getElementById('seta-direita');

// Função para atualizar a exibição do planeta e da sombra
function atualizarPlaneta() {
    const planetaAtual = planetas[indiceAtual];
    const sombraAtual = sombras[indiceAtual];

    // Atualiza a imagem principal do planeta
    imgPlaneta.src = planetaAtual.imagem;
    imgPlaneta.alt = planetaAtual.nome;

    // Atualiza a sombra correspondente
    miniPlanetas.src = sombraAtual.imagem;
    miniPlanetas.alt = sombraAtual.nome;

    // Gerencia o estado de desbloqueio
    if (planetaAtual.desbloqueado) {
        imgPlaneta.classList.remove('bloqueado'); // Remove a classe bloqueado para planetas desbloqueados
        linkPlaneta.href = planetaAtual.link || '#'; // Define o link para o planeta
        linkPlaneta.style.pointerEvents = 'auto'; // Permite interação (link clicável)
    } else {
        imgPlaneta.classList.add('bloqueado'); // Adiciona a classe bloqueado para planetas bloqueados
        linkPlaneta.href = '#'; // Bloqueia o link
        linkPlaneta.style.pointerEvents = 'none'; // Desabilita o clique
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

// Chamada inicial para exibir o primeiro planeta e sombra
atualizarPlaneta();

//redirecionar para login
let botao = document.querySelector(".saida-inicio")
botao.addEventListener("click", () => {
    if(confirm("Você deseja realmente sair?\nSe sim, pressione 'ok'")) {
        window.location.href = "/login"
    }
})