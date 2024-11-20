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
            window.location.href = "/conteudos-atividades?id_conteudo=8";
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
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button id="botaoEspecial">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/oasis";
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
        
        let resposta_console = document.querySelector('.espaco-resposta');
        resposta_console.innerHTML = `<p class="paragrafo">valor1 = <input class="conteudo" type="number" value=""></p>
        <p class="paragrafo">valor2 = <input class="conteudo2" type="number" value=""></p>
        <p class="paragrafo">resultado_soma = valor1 + valor2</p>
        <p class="paragrafo">print(resultado_soma)</p>
        `;
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
    } else {
        console.warn("Conteúdo fora do limite permitido.");
    }
}

function carregarProximoConteudo() {
    if (idConteudo < 20) {  // Define um limite máximo
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
        } else if (campo.value != "print") {
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
                    tit.innerText = "Aqui o resultado depende dos números que você digitou. Você pode voltar e decidir outros números a qualquer momento."
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

async function atualizarBarraDeProgresso() {
    const barraProgresso = document.getElementById('barra-progresso');
    const totalConteudosFase1 = 14; // Primeira fase vai de 1 a 14
    const totalConteudosFase2 = 8;  // Segunda fase vai de 15 a 22
    const totalConteudosFase3 = 6;  // Terceira fase vai de 23 a 28
    const totalConteudos = totalConteudosFase1 + totalConteudosFase2 + totalConteudosFase3;

    // Determina o progresso com base na fase atual
    let progresso = 0;
    if (idConteudo <= totalConteudosFase1) {
        // Fase 1 (conteúdos de 1 a 14)
        progresso = (idConteudo / totalConteudosFase1) * 100;
    } else if (idConteudo > totalConteudosFase1 && idConteudo <= totalConteudosFase1 + totalConteudosFase2) {
        // Fase 2 (conteúdos de 15 a 22)
        progresso = ((idConteudo - totalConteudosFase1) / totalConteudosFase2) * 100;
    } else if (idConteudo > totalConteudosFase1 + totalConteudosFase2) {
        // Fase 3 (conteúdos de 23 a 28)
        progresso = ((idConteudo - totalConteudosFase1 - totalConteudosFase2) / totalConteudosFase3) * 100;
    }

    // Atualiza a barra de progresso
    barraProgresso.style.width = `${progresso}%`;

    // Lógica para completar as fases e desbloquear a próxima
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const id_cadastro = userData.id_cadastro;

        // Fase 1: Completa quando o conteúdo 14 é atingido
        if (idConteudo === totalConteudosFase1) {
            try {
                // Chamada para completar a fase 1
                const response = await fetch('http://localhost:3000/fase/completar_fase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_fase: 1, id_cadastro: id_cadastro })
                });

                if (response.ok) {
                    console.log('Fase 1 concluída!');
                }
            } catch (error) {
                console.error('Erro ao completar fase 1:', error);
            }
        }

        // Fase 2: Completa quando o conteúdo 22 é atingido
        if (idConteudo === totalConteudosFase1 + totalConteudosFase2) {
            try {
                // Chamada para completar a fase 2
                const response = await fetch('http://localhost:3000/fase/completar_fase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_fase: 2, id_cadastro: id_cadastro })
                });

                if (response.ok) {
                    console.log('Fase 2 concluída!');
                }
            } catch (error) {
                console.error('Erro ao completar fase 2:', error);
            }
        }

        // Fase 3: Completa quando o conteúdo 28 é atingido
        if (idConteudo === totalConteudosFase1 + totalConteudosFase2 + totalConteudosFase3) {
            try {
                // Chamada para completar a fase 3
                const response = await fetch('http://localhost:3000/fase/completar_fase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id_fase: 3, id_cadastro: id_cadastro })
                });

                if (response.ok) {
                    console.log('Fase 3 concluída!');
                }
            } catch (error) {
                console.error('Erro ao completar fase 3:', error);
            }
        }
    }
}


// Chama a função para carregar o progresso quando a página carregar
window.addEventListener('load', atualizarBarraDeProgresso);