// const { type } = require("os");

document.addEventListener("DOMContentLoaded", () => {
    atualizarImagem();
    // quando for o conteudo numero 9, o layout de atividade deve ser modificado dinacinamicamente coforme o figma
    if (idConteudo == 9) {
        conteudo("#conteudo")
        conteudo("#paragrafo")
        let resposta_console = document.querySelector('.espaco-resposta')
        let fundo_abas = document.querySelector('.fundo_abas')
        let insert_button = document.querySelector('.div2')
        insert_button.innerHTML += `
        <button oncliclick = "carregarProximoConteudo()">Próximo Conteúdo</button>
        `
        fundo_abas.style.width = '64px'
        fundo_abas.style.margin = '0 0 0 48px'
        resposta_console.innerHTML = `
        <p>Hello, World!</p>
        `
    }
});
// remove as tags para exibir o console apenas com a resposta
let conteudo = (id) => {
    let tag = document.querySelector(id)
    if (tag) {
        tag.remove()
    }
}


function carregarProximoConteudo() {
    idConteudo += 1;
    
    if (idConteudo <= 3) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 4 && idConteudo <= 7) {
        window.location.href = `/conteudos-imgs?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 8 && idConteudo <= 10) {
        // Inclui id_conteudo na rota
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`;
        // window.location.href = `/conteudos-atividades`;
    } else {
        idConteudo = 10;  // Limite máximo
    }
}




function carregarConteudoAnterior() {
    if (idConteudo > 1) {
        idConteudo -= 1;
        if (idConteudo <= 3) {
            window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
        } else if (idConteudo >= 4 && idConteudo <= 7) {
            window.location.href = `/conteudos-imgs?id_conteudo=${idConteudo}`; 
        } else if (idConteudo >= 8 && idConteudo <= 10) {
            // Inclui id_conteudo na rota
            window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`;
            // window.location.href = `/conteudos-atividades`;
        }
    } else {
        window.location.href = '/oasis';
    }

}

function atualizarImagem() {
    // Seleciona o elemento da imagem no DOM
    const imagem = document.getElementById("img-marcada");

    // Verifica se o idConteudo corresponde aos casos em que a imagem deve ser alterada
    if (idConteudo >= 5 && idConteudo <= 7) {
        // Verifica se o elemento foi encontrado antes de tentar definir o src
        if (imagem) {
            if (idConteudo === 5) {
                imagem.src = "../imgs-pug/imagem_marcada_2.png";
            } else if (idConteudo === 6) {
                imagem.src = "../imgs-pug/imagem_marcada_3.png";
            } else if (idConteudo === 7) {
                imagem.src = "../imgs-pug/imagem_marcada_4.png";
            }
        } else {
            console.error("Elemento de imagem não encontrado!");
        }
    }
}

// função da rota de atividades
function teste_campo() {
    //validar se o campo de texto possui algum valor antes de ativar a função para ir para próxima parte da atividade
    let campo = document.querySelector("#conteudo")
    if (campo.value != "print") {
        alert("Observe sua lógica e tente novamente!")
    } else {
        carregarProximoConteudo()
    }
}
// pega o valor do botao e coloca no input
function botoes() {
    let botao1 = document.querySelector('.botoes-resposta')
    let campo = document.querySelector('#conteudo')
    let tit = document.querySelector('.h2-header')
    campo.value = botao1.innerText
    tit.innerText = "Clique em testar para exibir!"
}

