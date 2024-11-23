document.addEventListener("DOMContentLoaded", () => {
    atualizarImagem();
    
    if (idConteudo == 8) {
        let botao = document.querySelector(".resposta");
        let espaco_resposta = document.querySelector('.espaco-resposta')
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">print</button>`;
        espaco_resposta.style.flexDirection = "row"
        espaco_resposta.style.alignItems = "center"
    } else if (idConteudo == 9) {
        conteudo(".linha_vertical_abas_terminal_resposta");
        conteudo(".img_botao_reset");
        conteudo(".conteudo");
        conteudo(".paragrafo");
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
            window.location.href = "/conteudos-imgs?id_conteudo=7";
        };
    }
     else if (idConteudo == 13) {
        let botao = document.querySelector(".resposta");
        let espaco_resposta = document.querySelector('.espaco-resposta')
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">print</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">if</button>`;
        espaco_resposta.style.flexDirection = "row"
        espaco_resposta.style.alignItems = "center"
    } else if (idConteudo == 14) {
        conteudo(".button1_div2");
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');

        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        insert_button.innerHTML += `<button id="botaoEspecial2">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial2").onclick = function() {
            window.location.href = "/oasis";
        };
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos?id_conteudo=12";
        };
    } else if (idConteudo == 15) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        
        // Insere o botão no início da div (antes de qualquer outro conteúdo)
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial">Conteúdo Anterior</button>`);
        
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 18) {
        conteudo(".conteudo") // limpa o console
        conteudo(".paragrafo")
        let insert_button = document.querySelector('.div2');
        // Insere o botão no início da div (antes de qualquer outro conteúdo)
        insert_button.insertAdjacentHTML('afterbegin', `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`);
        let resposta_console = document.querySelector('.espaco-resposta');
        resposta_console.innerHTML = `<p class="paragrafo">valor1 = <input class="conteudo" type="number" value="10" disabled></p>
        <p class="paragrafo">valor2 = <input class="conteudo" type="number" value="10" disabled></p>
        <p class="paragrafo">resultado_soma = valor1 + valor2</p>
        <p class="paragrafo">print(resultado_soma)</p>
        `;
    } else if (idConteudo == 19) {
        conteudo(".linha_vertical_abas_terminal_resposta");
        conteudo(".img_botao_reset");
        conteudo(".conteudo");
        conteudo(".paragrafo");
        conteudo(".terminal-button2 ");
        let resposta_console = document.querySelector('.espaco-resposta');
        let fundo_abas = document.querySelector('.fundo_abas');
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`;
        fundo_abas.style.width = '64px';
        fundo_abas.style.margin = '0 0 0 48px';
        resposta_console.innerHTML = `<p>20</p>`;
    } else if (idConteudo == 20) {
        conteudo(".conteudo") // limpa o console
        conteudo(".paragrafo")
        
        let insert_button = document.querySelector('.div2');
        let resposta_console = document.querySelector('.espaco-resposta');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        resposta_console.innerHTML = `<p class="paragrafo">valor1 = <input class="conteudo" type="number" value=""></p>
        <p class="paragrafo">valor2 = <input class="conteudo2" type="number" value=""></p>
        <p class="paragrafo">resultado_soma = valor1 + valor2</p>
        <p class="paragrafo">print(resultado_soma)</p>
        `;
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos-atividades?id_conteudo=18";
        };
    } else if (idConteudo == 21) {
        let insert_button = document.querySelector("footer")
        insert_button.insertAdjacentHTML('afterbegin', `<button class="button_back_next" id="botaoEspecial1">Conteúdo Anterior</button>`)
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos-atividades?id_conteudo=20";
        };
    } else if (idConteudo == 22) {
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button id="botaoEspecial">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 23) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 24) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
    }
    
});

// remove as tags para exibir o console apenas com a resposta
function conteudo(id){
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
    } else if (idConteudo >= 14 && idConteudo <= 17) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else if (idConteudo >= 18 && idConteudo <= 20) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`;
    } else if (idConteudo == 21) {
        window.location.href = `/conteudos-check?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 22 && idConteudo <= 23){
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
    } else if (idConteudo == 24) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`;
    } else {
        console.warn("Conteúdo fora do limite permitido.");
    }
}

function carregarProximoConteudo() {
    if (idConteudo < 24) {  // Define um limite máximo
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
    const oasis = document.querySelector(".img-header-left");
    
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
    } else if (idConteudo >= 15) {
        oasis.src = "../assets/imgs-pug/oasis-02.png"
    }
}

function recarregar_pagina() {
    location.reload()
}

// Função para testar a resposta e alterar os botões
function teste_campo() {
    let campo = document.querySelector(".conteudo");
    // let botaoTestar = document.querySelector('.terminal-button');
    // let botaoPrint = document.querySelector('.botoes-resposta');
    // let espacoResposta = document.querySelector('.espaco-resposta');
    let tit = document.querySelector(".h2-header")
    if (campo){
        
        if (idConteudo == 8 && campo.value == "print") {
            carregarProximoConteudo()
        } else if (campo.value == "print" && idConteudo == 13) {
            conteudo(".img_botao_reset")
            conteudo(".linha_vertical_abas_terminal_resposta")
            conteudo(".botoes-resposta")
            conteudo(".botoes-resposta")
            conteudo(".terminal-button2")
            let resposta_console = document.querySelector('.espaco-resposta')
            let fundo_abas = document.querySelector('.fundo_abas')
            let insert_button = document.querySelector('.div2')
            // insert_button.innerHTML += `<button onclick ="carregarConteudoAnterior()">Conteúdo Anterior</button>`
            insert_button.innerHTML = `<button onclick ="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`
            fundo_abas.style.width = '64px'
            fundo_abas.style.margin = '0 0 0 48px'
            resposta_console.innerHTML = `<p>Hello, World!</p>`
            tit.innerText = "Muito bem! Sua mensagem foi exibida na tela/console com sucesso!"
        } else if (campo.value != "print" && idConteudo == 8 || campo.value != "print" && idConteudo == 13) {
            tit.innerText = "Observe sua lógica e tente novamente!";
        } else if (campo.value == "if") {
            tit.innerText = "Pense sobre o que aprendeu. Qual dos comandos vai exibir a frase 'Hello, World!' no console?";
        }
        if (idConteudo == 18) {
            carregarProximoConteudo()
        }
        if (idConteudo == 20) {
            let conteudo = document.querySelector(".conteudo")
            let conteudo2 = document.querySelector(".conteudo2")
            if (conteudo.value == 0 || conteudo2.value == 0){
                tit.innerText = "Estamos sem números para somar :("
            } else {
                let resultado = Number(conteudo.value) + Number(conteudo2.value)
                let resposta_console = document.querySelector('.espaco-resposta');
                resposta_console.innerHTML = `<p class="resultado_conta">${resultado}</p>`;
                let resultado_conta = document.querySelector(".resultado_conta")
                if (resultado_conta.innerHTML == resultado) {
                    tit.innerText = "Meus parabéns!\nSomamos os valores armazenados em valor1 e valor2"
                    tit.style.textAlign = "center"
                    // não deu de chamar a função de remover, então eu fiz manualmente cada uma
                    let botao_reset = document.querySelector(".img_botao_reset")
                    let linha_esquerda_vertical_botao_reset = document.querySelector(".linha_vertical_abas_terminal_resposta")
                    let botao_testar = document.querySelector(".terminal-button2")
                    let fundo_abas = document.querySelector('.fundo_abas')
                    let insert_button = document.querySelector('.div2')
                    botao_reset.remove()
                    linha_esquerda_vertical_botao_reset.remove()
                    botao_testar.remove()
                    fundo_abas.style.width = '64px'
                    fundo_abas.style.margin = '0 0 0 48px'
                    insert_button.innerHTML = `<button onclick ="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`

                }
            }
        }
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