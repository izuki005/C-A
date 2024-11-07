document.addEventListener("DOMContentLoaded", () => {
    atualizarImagem();
});
function carregarProximoConteudo() {
    idConteudo += 1;
    
    if (idConteudo <= 3) {
        // Redireciona para a rota /conteudos
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 4 && idConteudo <= 7) {
        // Redireciona para a rota /conteudos-imgs
        window.location.href = `/conteudos-imgs?id_conteudo=${idConteudo}`;
    } else {
        idConteudo = 7;  // Limite máximo
    }

}

function carregarConteudoAnterior() {
    if (idConteudo > 1) {
        idConteudo -= 1;
        if (idConteudo <= 3) {
            window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
        } else if (idConteudo >= 4) {
            window.location.href = `/conteudos-imgs?id_conteudo=${idConteudo}`;
        }
    } else {
        window.location.href = '/oasis';
    }

}

function atualizarImagem() {
    // Seleciona o elemento da imagem no DOM
    const imagem = document.getElementById("img-marcada");

    // Verifica se o elemento foi encontrado antes de tentar definir o src
    if (imagem) {
        if (idConteudo === 5) {
            imagem.src = "../assets/imgs-pug/imagem_marcada_2.png";
        } else if (idConteudo === 6) {
            imagem.src = "../assets/imgs-pug/imagem_marcada_3.png";
        } else if (idConteudo === 7) {
            imagem.src = "../assets/imgs-pug/imagem_marcada_4.png";
        }
    } else {
        console.error("Elemento de imagem não encontrado!");
    }
}

