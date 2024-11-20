let cont = 1
// Seleciona todos os checkboxes
const checkboxes = document.querySelectorAll('.input_centro')

// Resposta correta configurada
let respostaCorreta = "Comando de Saída"; // Altere conforme necessário

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
        tit.innerText = `valor1 = 10 Qual dos valores guardados será exibido no print( )?\n
        valor2 = 20\n
        print(valor2)`
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
        imagemBotao.src = "../assets/imgs-pug/botao_verific_amarelo.png"
    }
    if (valorSelecionado !== null) {
        verificarResposta(valorSelecionado);
    } else {
        console.log("Por favor, selecione uma opção antes de clicar na imagem.");
    }
});

function verificarResposta(valorSelecionado) {
    // Verifica se a resposta está correta ou incorreta e altera a imagem
    if (valorSelecionado === respostaCorreta) {
        cont += 1
        console.log(cont)
        console.log("Resposta correta! 🎉");
        let borda_verde = document.querySelector(".terminal-centro")
        borda_verde.style.border = "2px solid rgba(38, 181, 2, 0.8)"
        imagemBotao.src = "../assets/imgs-pug/botao_verific_verde.png"; // Altera a imagem para verde
        if (respostaCorreta == "Comando de Saída") {
            setTimeout(() => {
                imagemBotao.src = "../assets/imgs-pug/passar-direito.png"; // Atualiza a imagem
                // Verifica se o caminho final corresponde
            }, 5000); // 5000 milissegundos = 5 segundos
        } else if (respostaCorreta == "20") {
            setTimeout(() => {
                // Verifica se o caminho final corresponde
                idConteudo = 22;
                window.location.href = `/conteudos?id_conteudo=${idConteudo}`
            }, 5000); // 5000 milissegundos = 5 segundos
        }
        
    } else {
        cont += 1    
        console.log(cont)    
        console.log(`Resposta incorreta. Você selecionou: ${valorSelecionado}`);
        let borda_vermelha = document.querySelector(".terminal-centro")
        borda_vermelha.style.border = "2px solid rgba(181, 2, 2, 0.8)"
        imagemBotao.src = "../assets/imgs-pug/botao_verific_vermelho.png"; // Altera a imagem para vermelha
    }
}