let respostaCorreta = ""; // Altere conforme necessário
document.addEventListener("DOMContentLoaded", () => {
    if (idConteudo == 21) {
        respostaCorreta = "Comando de Saída"
    } else if (idConteudo == 35) {
        respostaCorreta = "if"
        console.log("A resposta certa é: "+respostaCorreta)
        console.log("O valor selecionado é: "+ valorSelecionado)
        let label_entrada = document.querySelector('label[for="entrada"')
        let input_entrada = document.querySelector('#entrada')
        let label_saida = document.querySelector('label[for="saida"]')
        let input_saida = document.querySelector("#saida")
        let label_entrada_saida = document.querySelector('label[for="entrada_saida"')
        let input_entrada_saida = document.querySelector("#entrada_saida")
        let borda_normal = document.querySelector(".terminal-centro")
        label_entrada.innerText = "print"
        input_entrada.value = "print"
        label_saida.innerText = "while"
        input_saida.value = "while"
        label_entrada_saida.innerText = "if"
        input_entrada_saida.value = "if"
        borda_normal.style.border = "2px solid #E19A2F"
    } else if (idConteudo == 36) {
        respostaCorreta = "Vou ser impresso"
        console.log("A resposta certa é: "+respostaCorreta)
        console.log("O valor selecionado é: "+ valorSelecionado)
        let label_entrada = document.querySelector('label[for="entrada"')
        let input_entrada = document.querySelector('#entrada')
        let label_saida = document.querySelector('label[for="saida"]')
        let input_saida = document.querySelector("#saida")
        let label_entrada_saida = document.querySelector('label[for="entrada_saida"')
        let input_entrada_saida = document.querySelector("#entrada_saida")
        let borda_normal = document.querySelector(".terminal-centro")
        label_entrada.innerText = "Vou ser impresso"
        input_entrada.value = "Vou ser impresso"
        label_saida.innerText = "Nada porque o bloco é ignorado"
        input_saida.value = "Nada porque o bloco é ignorado"
        label_entrada_saida.innerText = "print"
        input_entrada_saida.value = "print"
        borda_normal.style.border = "2px solid #E19A2F"
    } else if (idConteudo == 37) {
        respostaCorreta = "Nada porque o bloco é ignorado"
        console.log("A resposta certa é: "+respostaCorreta)
        console.log("O valor selecionado é: "+ valorSelecionado)
        let label_entrada = document.querySelector('label[for="entrada"')
        let input_entrada = document.querySelector('#entrada')
        let label_saida = document.querySelector('label[for="saida"]')
        let input_saida = document.querySelector("#saida")
        let label_entrada_saida = document.querySelector('label[for="entrada_saida"')
        let input_entrada_saida = document.querySelector("#entrada_saida")
        let borda_normal = document.querySelector(".terminal-centro")
        label_entrada.innerText = "Vou ser impresso"
        input_entrada.value = "Vou ser impresso"
        label_saida.innerText = "Nada porque o bloco é ignorado"
        input_saida.value = "Nada porque o bloco é ignorado"
        label_entrada_saida.innerText = "print"
        input_entrada_saida.value = "print"
        borda_normal.style.border = "2px solid #E19A2F"
    } else if (idConteudo == 38) {
        respostaCorreta = "Condições"
        console.log("A resposta certa é: "+respostaCorreta)
        console.log("O valor selecionado é: "+ valorSelecionado)
        let label_entrada = document.querySelector('label[for="entrada"')
        let input_entrada = document.querySelector('#entrada')
        let label_saida = document.querySelector('label[for="saida"]')
        let input_saida = document.querySelector("#saida")
        let label_entrada_saida = document.querySelector('label[for="entrada_saida"')
        let input_entrada_saida = document.querySelector("#entrada_saida")
        let borda_normal = document.querySelector(".terminal-centro")
        label_entrada.innerText = "Condições"
        input_entrada.value = "Condições"
        label_saida.innerText = "Números inteiros"
        input_saida.value = "Números inteiros"
        label_entrada_saida.innerText = "O bloco de código"
        input_entrada_saida.value = "O bloco de código"
        borda_normal.style.border = "2px solid #E19A2F"
    }
})

// Seleciona todos os checkboxes
const checkboxes = document.querySelectorAll('.input_centro')

// Resposta correta configurada

// Seleciona a imagem
const imagemBotao = document.getElementById('botaoVerificar')

// Variável para armazenar o valor selecionado
let valorSelecionado = null

// Adiciona evento de clique aos checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        // Desmarcar todas as outras opções
        checkboxes.forEach(cb => {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });
        
        // Marca o checkbox selecionado
        valorSelecionado = checkbox.value
    });
});

// Adiciona evento de clique à imagem para verificar a resposta
imagemBotao.addEventListener('click', () => {
    if (imagemBotao.src.endsWith("passar-direito.png")) {
        let tit = document.querySelector(".h2-header")
        let label_entrada = document.querySelector('label[for="entrada"')
        let input_entrada = document.querySelector('#entrada')
        let label_saida = document.querySelector('label[for="saida"]')
        let input_saida = document.querySelector("#saida")
        let label_entrada_saida = document.querySelector('label[for="entrada_saida"')
        let input_entrada_saida = document.querySelector("#entrada_saida")
        let borda_normal = document.querySelector(".terminal-centro")
        tit.innerText = `Qual dos valores será exibido ? valor1 = 10 valor2 = 20\n print(valor2)`
        label_entrada.innerText = "10"
        input_entrada.value = "10"
        label_saida.innerText = "20"
        input_saida.value = "20"
        label_entrada_saida.innerText = "valor1"
        input_entrada_saida.value = "valor1"
        borda_normal.style.border = "2px solid #E19A2F"
        // Desmarca os checkboxes
        input_entrada.checked = false;
        input_saida.checked = false;
        input_entrada_saida.checked = false;
        valorSelecionado = null;
        respostaCorreta = "20"
        console.log("A resposta certa é: " + respostaCorreta)
        imagemBotao.src = "../assets/imgs-pug/botao_verific_amarelo.png"
    }
    if (valorSelecionado !== null) {
        verificarResposta(valorSelecionado);
    } else {
        console.log("Por favor, selecione uma opção antes de clicar na imagem.");
    }
});

function verificarResposta(valorSelecionado) {
    if (valorSelecionado === respostaCorreta) {
        console.log("Resposta correta! 🎉");
        let borda_verde = document.querySelector(".terminal-centro")
        borda_verde.style.border = "2px solid rgba(38, 181, 2, 0.8)"
        imagemBotao.src = "../assets/imgs-pug/botao_verific_verde.png";
        // essa parte é uma excessão
        
    } else { 
        console.log(`Resposta incorreta. Você selecionou: ${valorSelecionado}`);
        let borda_vermelha = document.querySelector(".terminal-centro")
        let tit = document.querySelector(".h2-header")
        let valorInicial = tit ? tit.innerHTML : ""; // Salva o estado inicial
        let borda_normal = document.querySelector(".terminal-centro")
        borda_vermelha.style.border = "2px solid rgba(181, 2, 2, 0.8)"
        imagemBotao.src = "../assets/imgs-pug/botao_verific_vermelho.png";
        tit.innerText = "Tente outra opção!" // Altera a imagem para vermelha
        setTimeout(() => {
            imagemBotao.src = "../assets/imgs-pug/botao_verific_amarelo.png";
            borda_normal.style.border = "2px solid #E19A2F"
            tit.innerHTML = valorInicial
        }, 3000);
    }
    
    // verifica a resposta correta e direciona para a próxima etapa
    if (respostaCorreta == "20" && imagemBotao.src.endsWith("botao_verific_verde.png")) {
        setTimeout(() => {
            idConteudo = 22;
            window.location.href = `/conteudos?id_conteudo=${idConteudo}`
        }, 4000);
    }
    if (respostaCorreta == "Comando de Saída" && imagemBotao.src.endsWith("botao_verific_verde.png")) {
        setTimeout(() => {
            imagemBotao.src = "../assets/imgs-pug/passar-direito.png"
        }, 4000);
    }
    if (respostaCorreta == "if" && imagemBotao.src.endsWith("botao_verific_verde.png")) {
        setTimeout (() => {
            window.location.href = `/conteudos-check?id_conteudo=36`
        },4000)
    }
    if (respostaCorreta == "Vou ser impresso" && imagemBotao.src.endsWith("botao_verific_verde.png")) {
        setTimeout (() => {
            window.location.href = `/conteudos-check?id_conteudo=37`
        },4000) 
    }
    if (respostaCorreta == "Nada porque o bloco é ignorado" && imagemBotao.src.endsWith("botao_verific_verde.png")) {
        setTimeout (() => {
            window.location.href = `/conteudos-check?id_conteudo=38`
        },4000) 
    }
    if (respostaCorreta == "Condições" && imagemBotao.src.endsWith("botao_verific_verde.png")) {
        setTimeout (() => {
            window.location.href = `/conteudos?id_conteudo=39`
        },4000) 
    }
}
