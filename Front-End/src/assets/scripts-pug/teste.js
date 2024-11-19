document.addEventListener("DOMContentLoaded", () => {
    atualizarImagem();

    if (idConteudo == 8) {
        let botao = document.querySelector(".resposta");
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">print</button>`;
    } else if (idConteudo == 9) {
        conteudo(".linha_vertical_abas_terminal_resposta");
        conteudo(".img_botao_reset");
        conteudo(".conteudo");
        conteudo("#paragrafo");
        conteudo(".terminal-button2 ");
        let resposta_console = document.querySelector('.espaco-resposta');
        let fundo_abas = document.querySelector('.fundo_abas');
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`;
        fundo_abas.style.width = '64px';
        fundo_abas.style.margin = '0 0 0 48px';
        resposta_console.innerHTML = `<p>Hello, World!</p>`;
    } else if (idConteudo == 10) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        
        // Insere o botão no início da div (antes de qualquer outro conteúdo)
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial">Conteúdo Anterior</button>`);
    
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/conteudos-atividades?id_conteudo=8";
        };
    }
     else if (idConteudo == 13) {
        let botao = document.querySelector(".resposta");
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">print</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">if</button>`;
    } else if (idConteudo == 14) {
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button id="botaoEspecial">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/oasis";
        };
    }
});

// remove as tags para exibir o console apenas com a resposta
let conteudo = (id) => {
    let tag = document.querySelector(id)
    if (tag) {
        tag.remove()
    } else {
        alert("está tag não existe! Seu identificador deve estar errado!")
    }
}

function navegarConteudo(idConteudo) {
    if (idConteudo <= 3) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 4 && idConteudo <= 7) {
        window.location.href = `/conteudos-imgs?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 8 && idConteudo <= 9) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 10 && idConteudo <= 12) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else if (idConteudo == 13) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`;
    } else if (idConteudo == 14) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else {
        console.warn("Conteúdo fora do limite permitido.");
    }
}

function carregarProximoConteudo() {
    if (idConteudo < 14) {  // Define um limite máximo
        idConteudo += 1;
        navegarConteudo(idConteudo);
    } else {
        console.warn("Você está no último conteúdo.");
    }
}

function carregarConteudoAnterior() {
    if (idConteudo > 1) {  // Define um limite mínimo
        idConteudo -= 1;
        navegarConteudo(idConteudo);
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

function recarregar_pagina() {
    location.reload()
}

// Função para testar a resposta e alterar os botões
function teste_campo() {
    let campo = document.querySelector(".conteudo");
    let botaoTestar = document.querySelector('.terminal-button');
    let botaoPrint = document.querySelector('.botoes-resposta');
    let espacoResposta = document.querySelector('.espaco-resposta');
    let tit = document.querySelector(".h2-header")
    
    // Se o campo não estiver correto, avisa o usuário
    if (campo.value != "print") {
        tit.innerText = "Observe sua lógica e tente novamente!";
    } else if (idConteudo == 13) {
        conteudo(".img_botao_reset")
        conteudo(".linha_vertical_abas_terminal_resposta")
        conteudo(".botoes-resposta")
        conteudo(".botoes-resposta")
        conteudo(".terminal-button2")
        let resposta_console = document.querySelector('.espaco-resposta')
        let fundo_abas = document.querySelector('.fundo_abas')
        let insert_button = document.querySelector('.div2')
        // insert_button.innerHTML += `<button onclick ="carregarConteudoAnterior()">Conteúdo Anterior</button>`
        insert_button.innerHTML += `<button onclick ="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`
        fundo_abas.style.width = '64px'
        fundo_abas.style.margin = '0 0 0 48px'
        resposta_console.innerHTML = `<p>Hello, World!</p>`
        tit.innerText = "Muito bem! Sua mensagem foi exibida na tela/console com sucesso!"
    } else if (campo.value == "if"){
        tit.innerText = "Pense sobre o que aprendeu. Qual dos comandos vai exibir a frase 'Hello, World!' no console?";
    } else {
        
        carregarProximoConteudo();
    }
}

// Adiciona evento de clique a todos os botões com a classe "botoes-resposta"
document.querySelectorAll(".botoes-resposta").forEach(botao => {
    botao.addEventListener("click", (event) => botoes(event));
});

function botoes(event) {
    let botaoClicado = event.target;
    let tit = document.querySelector('.h2-header');

    // Verifica se o elemento tit existe antes de acessar innerText
    if (tit) {
        tit.innerText = "Clique em testar para exibir!";
    }

    let campos = document.querySelectorAll('.conteudo');

    for (let campo of campos) {
        if (campo.value === "") {
            campo.value = botaoClicado.innerText;
            break;
        }
    }

    let todosPreenchidos = Array.from(campos).every(campo => campo.value !== "");

    if (todosPreenchidos) {
        document.querySelectorAll(".botoes-resposta").forEach(botao => {
            botao.classList.add("apagado");
        });
    }

    // Verifica se botaoClicado existe antes de adicionar a classe "apagado"
    if (botaoClicado) {
        botaoClicado.classList.add("apagado");
    }

    let botaoTestar = document.querySelector('.terminal-button');
    if (botaoTestar) {
        botaoTestar.classList.remove("apagado");
    }
}

async function atualizarBarraDeProgresso() {
    const barraProgresso = document.getElementById('barra-progresso');
    const totalConteudos = 14;
    const progresso = (idConteudo / totalConteudos) * 100;

    // Atualiza a largura da barra de progresso
    barraProgresso.style.width = `${progresso}%`;

    if (idConteudo === totalConteudos) {
        const userDataString = localStorage.getItem('userData')

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const id_cadastro = userData.id_cadastro;

            try {
                // Chamada para completar a fase
                const response = await fetch('http://localhost:3000/fase/completar_fase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_fase: 1, id_cadastro: id_cadastro })
                });

                const data = await response.json();
                console.log('Fase completada:', data);
            } catch (error) {
                console.error('Erro ao completar a fase:', error);
            }
        } else {
            console.error('Dados do usuário não encontrados no localStorage');
        }
    }
}


// Chama a função para carregar o progresso quando a página carregar
window.addEventListener('load', atualizarBarraDeProgresso);