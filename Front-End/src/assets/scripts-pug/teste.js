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
        fundo_abas.style.width = '72px';
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
    } else if (idConteudo == 13) {
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
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()" >Conteúdo Anterior</button>`;
        insert_button.innerHTML += `<button onclick="carregarProximoConteudo()" >Próximo Conteúdo</button>`;
        fundo_abas.style.width = '72px';
        fundo_abas.style.margin = '0 0 0 48px';
        resposta_console.innerHTML = `<p>20</p>`;
    } else if (idConteudo == 20) {
        conteudo(".conteudo") // limpa o console
        conteudo(".paragrafo")
        let resposta_console = document.querySelector('.espaco-resposta');
        resposta_console.innerHTML = `<p class="paragrafo">valor1 = <input class="conteudo" type="text" value="" id="valor1"></p>
        <p class="paragrafo">valor2 = <input class="conteudo2" type="text" value="" id="valor2"></p>
        <p class="paragrafo">resultado_soma = valor1 + valor2</p>
        <p class="paragrafo">print(resultado_soma)</p>
        <p id="erroMensagem" style="color: red;"></p>
        `;
    } else if (idConteudo == 21) {
        let insert_button = document.querySelector("footer")
        insert_button.insertAdjacentHTML('afterbegin', `<button class="button_back_next" id="botaoEspecial1">Conteúdo Anterior</button>`)
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = `/conteudos-atividades?id_conteudo=19`;
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
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p class="pai_p"><input style="color: #8A8888; border: none; width: 320px; background: transparent;" type="text" value='# Exemplo: nome = "João"' disabled></p>
        <p class="pai_p"><input class="filho_input" type="text"></p>
        <p class="pai_p"><input class="filho_input" type="text"></p>
        <p class="pai_p"><input style="color: #fff;border: none; width: 330px; background: transparent;" type="text" value='print(f"Olá, meu nome é {nome} e tenho {idade} anos!")' disabled></p>`
    } else if (idConteudo == 25) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos?id_conteudo=23";
        };
    } else if (idConteudo == 26) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p class="pai_p"><input style="color: #fff;border: none; width: 330px; background: transparent;" type="text" value='nome = "Maria"' disabled>
        <input style="color: #fff;border: none; width: 330px; background: transparent; margin-top: 20px;" type="text" value='idade = "18"' disabled>
        <input style="color: #fff;border: none; width: 330px; background: transparent; margin-top: 20px;" type="text" value='print(f"Olá, meu nome é {nome} e tenho {idade} anos!")' disabled>
        <input class="filho_input" style="margin-top: 20px;" type="text">
        <input style="color: #fff;border: none; width: 330px; background: transparent; margin-top: 20px;" type="text" value='print(f"Olá, meu nome é {nome} e tenho {idade} anos!")' disabled>
        </p>`
    } else if (idConteudo == 27) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos?id_conteudo=25";
        }
    } else if (idConteudo == 29) {
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button id="botaoEspecial">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 30) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 31) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        // espaco_resposta.style.fontSize = "16pt"
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;"><input class="filho_input" type="text"> True:</p>
        <p style="margin: 0 0 0 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Hello World")</p>`
        let filho_input = document.querySelector(".filho_input")
        filho_input.style.textAlign = "center"
        filho_input.style.width = "20px"
    } else if (idConteudo == 32) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = `/conteudos?id_conteudo=30`
        };
    } else if (idConteudo == 33) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        let botao = document.querySelector(".resposta");
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">False</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">True</button>`;
        // espaco_resposta.style.fontSize = "16pt"
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">if &nbsp;&nbsp;<input class="filho_input" type="text" disabled>:</p>
        <p style="margin: 0 0 0 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Hello World")</p>`
        let filho_input = document.querySelector(".filho_input")
        filho_input.style.textAlign = "center"
        filho_input.style.width = "40px"
    } else if (idConteudo == 34) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        let botao = document.querySelector(".resposta");
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">False</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">True</button>`;
        // espaco_resposta.style.fontSize = "16pt"
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">if &nbsp;&nbsp;<input class="filho_input" type="text" disabled>:</p>
        <p style="margin: 0 0 0 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Hello World")</p>`
        let filho_input = document.querySelector(".filho_input")
        filho_input.style.textAlign = "center"
        filho_input.style.width = "40px"
    } else if (idConteudo == 35) {
        let insert_button = document.querySelector("footer")
        insert_button.insertAdjacentHTML('afterbegin', `<button class="button_back_next" onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`)
    } else if (idConteudo == 36) {
        let insert_button = document.querySelector("footer")
        insert_button.insertAdjacentHTML('afterbegin', `<button class="button_back_next" id="botaoEspecial1">Conteúdo Anterior</button>`)
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos-check?id_conteudo=35";
        };
    } else if (idConteudo == 37) {
        let insert_button = document.querySelector("footer")
        insert_button.insertAdjacentHTML('afterbegin', `<button class="button_back_next" id="botaoEspecial1">Conteúdo Anterior</button>`)
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos-check?id_conteudo=36";
        };
    } else if (idConteudo == 38) {
        let insert_button = document.querySelector("footer")
        insert_button.insertAdjacentHTML('afterbegin', `<button class="button_back_next" id="botaoEspecial1">Conteúdo Anterior</button>`)
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/conteudos-check?id_conteudo=37";
        };
    } else if (idConteudo == 39) {
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button id="botaoEspecial">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 40) {
        conteudo(".button1_div2");
        let insert_button = document.querySelector('.div2');
        insert_button.insertAdjacentHTML('afterbegin', `<button id="botaoEspecial1">Conteúdo Anterior</button>`);
        document.getElementById("botaoEspecial1").onclick = function() {
            window.location.href = "/oasis";
        };
    } else if (idConteudo == 42) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">print("Carregando..")<br>print("Carregando..")<br>print("Carregando..")<br>print("Carregando..")<br>print("Carregando..")</p>`
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`;
    } else if (idConteudo == 43) {
        let h2_header = document.querySelector(".h2-header")
        let fundo_abas = document.querySelector('.fundo_abas')
        h2_header.style.width = "900px"
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        conteudo(".img_botao_reset")
        conteudo(".linha_vertical_abas_terminal_resposta")
        conteudo(".terminal-button2")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">Carregando..<br>Carregando..<br>Carregando..<br>Carregando..<br>Carregando..</p>`
        fundo_abas.style.width = '72px'
        fundo_abas.style.margin = '0 0 0 48px'
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`;
        insert_button.innerHTML += `<button onclick="carregarProximoConteudo()">Próximo Conteúdo</button>`;
    }  else if (idConteudo == 44) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">for i in range(1000):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Olá, mundo!")</p>`
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`;
    } else if (idConteudo == 45) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        conteudo(".img_botao_reset")
        conteudo(".linha_vertical_abas_terminal_resposta")
        conteudo(".terminal-button2")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">Olá, mundo!<br>Olá, mundo!<br>Olá, mundo!<br>Olá, mundo!<br>Olá, mundo!<br>Olá, mundo!<br>Olá, mundo!<br>Olá, mundo!<br>...</p>`
        let fundo_abas = document.querySelector('.fundo_abas')
        fundo_abas.style.width = '72px'
        fundo_abas.style.margin = '0 0 0 48px'
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`;
        insert_button.innerHTML += `<button onclick="carregarProximoConteudo()">Próximo Conteúdo</button>`;
    } else if (idConteudo == 48) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">for numero in range(1, 6):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"Este é o número {numero}")</p>`
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`;
    } else if (idConteudo == 49) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        conteudo(".img_botao_reset")
        conteudo(".linha_vertical_abas_terminal_resposta")
        conteudo(".terminal-button2")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">Este é o número 1<br>Este é o número 2<br>Este é o número 3<br>Este é o número 4<br>Este é o número 5</p>`
        let fundo_abas = document.querySelector('.fundo_abas')
        fundo_abas.style.width = '72px'
        fundo_abas.style.margin = '0 0 0 48px'
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button onclick="carregarConteudoAnterior()">Conteúdo Anterior</button>`;
        insert_button.innerHTML += `<button onclick="carregarProximoConteudo()">Próximo Conteúdo</button>`;
    } else if (idConteudo == 51) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        let botao = document.querySelector(".resposta");
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">range():</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">in</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">i</button>`;
        botao.innerHTML += `<button class="botoes-resposta" onclick="botoes(event)">for</button>`;
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;"><input class="filho_input" style="text-align: center; width: 50px;" type="text" disabled>&nbsp;&nbsp;<input class="filho_input" style="text-align: center; width: 50px;" type="text" disabled>&nbsp;&nbsp;<input class="filho_input" style="text-align: center; width: 50px;" type="text" disabled>&nbsp;&nbsp;<input class="filho_input" style="text-align: center; width: 50px;" type="text" disabled></p>`
    } else if (idConteudo == 52) {
        conteudo(".conteudo")
        conteudo(".paragrafo")
        conteudo(".resposta-usuario")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        espaco_resposta.innerHTML += ` 
        <p style="margin: 20px 0 0 0;">for&nbsp;&nbsp;numero&nbsp;&nbsp;in&nbsp;&nbsp;range(&nbsp;<input maxlength="3" class="filho_input" style="text-align: center; width: 50px;" type="text">&nbsp;):<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"Este é o número {numero}")</p>`
    } else if (idConteudo == 53) {
        conteudo(".button2_div2")
        let insert_button = document.querySelector('.div2');
        insert_button.innerHTML += `<button id="botaoEspecial">Próximo Conteúdo</button>`;
        // Modifica o onclick do botão para redirecionar para /oasis
        document.getElementById("botaoEspecial").onclick = function() {
            window.location.href = "/inicio-jogo";
        };
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
    } else if (idConteudo == 25 ) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;
        console.warn("Conteúdo fora do limite permitido.");
    } else if (idConteudo == 26) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 27 && idConteudo <= 30) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`
    } else if (idConteudo == 31) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 33 && idConteudo <= 34) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 35 && idConteudo <= 38) {
        window.location.href = `/conteudos-check?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 39 && idConteudo <= 41) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 42 && idConteudo <= 45) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 46 && idConteudo <= 47) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 48 && idConteudo <= 49) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`
    } else if (idConteudo == 50) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`
    } else if (idConteudo >= 51 && idConteudo <= 52) {
        window.location.href = `/conteudos-atividades?id_conteudo=${idConteudo}`
    } else if (idConteudo == 53) {
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`
    }
}

function carregarProximoConteudo() {
    if (idConteudo < 53) {  // Define um limite máximo
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
    } else if (idConteudo >= 15 && idConteudo <= 22) {
        oasis.src = "../assets/imgs-pug/oasis-02.png"
    } else if (idConteudo >= 23 && idConteudo <= 29) {
        oasis.src = "../assets/imgs-pug/oasis-03.png"
    } else if (idConteudo >= 30 && idConteudo <= 39) {
        oasis.src = "../assets/imgs-pug/oasis-04.png"
    } else if (idConteudo >= 40) {
        oasis.src = "../assets/imgs-pug/oasis-05.png"
    }
}

function recarregar_pagina() {
    location.reload()
}

// Função para testar a resposta e alterar os botões
function teste_campo() {
    let campo = document.querySelector(".conteudo");
    let filho = document.querySelector(".filho_input")
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
            fundo_abas.style.width = '72px'
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
            let conteudo = document.querySelector(".conteudo");
            let conteudo2 = document.querySelector(".conteudo2");
            
            // Verificação para campos vazios
            if (conteudo.value === "" || conteudo2.value === "") {
                tit.innerText = "Por favor, insira valores em ambos os campos.";
            } else if (conteudo.value == 0 || conteudo2.value == 0) {
                // Verificação para valores iguais a zero
                tit.innerText = "Estamos sem números para somar :(";
            } else {
                // Expressão regular para verificar se é um número válido
                let regexNumero = /^\d+(\.\d+)?$/;
        
                // Verificar se os valores inseridos são numéricos válidos
                if (!regexNumero.test(conteudo.value) || !regexNumero.test(conteudo2.value)) {
                    tit.innerText = "Por favor, insira apenas números válidos. Use ponto (.) para decimais.";
                } else {
                    // Se os valores forem válidos, realizar a soma
                    let resultado = Number(conteudo.value) + Number(conteudo2.value);
                    let resposta_console = document.querySelector('.espaco-resposta');
                    
                    // Exibir o resultado da soma no console de resposta
                    resposta_console.innerHTML = `<p class="resultado_conta">${resultado}</p>`;
                    let resultado_conta = document.querySelector(".resultado_conta");
        
                    // Verificar se o resultado foi exibido corretamente
                    if (resultado_conta.innerHTML == resultado) {
                        tit.innerText = "Bom trabalho!\nSomamos os valores armazenados em valor1 e valor2";
                        tit.style.textAlign = "center";
                        
                        // Limpar os elementos conforme a lógica
                        let botao_reset = document.querySelector(".img_botao_reset");
                        let linha_esquerda_vertical_botao_reset = document.querySelector(".linha_vertical_abas_terminal_resposta");
                        let botao_testar = document.querySelector(".terminal-button2");
                        let fundo_abas = document.querySelector('.fundo_abas');
                        let insert_button = document.querySelector('.div2');
        
                        // Remover os elementos não necessários
                        botao_reset.remove();
                        linha_esquerda_vertical_botao_reset.remove();
                        botao_testar.remove();
        
                        // Ajustar o estilo do fundo
                        fundo_abas.style.width = '72px';
                        fundo_abas.style.margin = '0 0 0 48px';
        
                        // Inserir o botão para carregar o próximo conteúdo
                        insert_button.innerHTML = `<button onclick="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`;
                    }
                }
            }
        }
    }        
    if (idConteudo == 24) {
        // Seleciona todos os campos com a classe filho_input
        let campos = document.querySelectorAll(".filho_input");
    
        // Valor do primeiro e segundo input
        const valorNome = campos[0].value.trim(); // Valor do primeiro campo (nome)
        const valorIdade = campos[1].value.trim(); // Valor do segundo campo (idade)
    
        // Expressões regulares
        const regexNome_dupla = /^nome\s*=\s*"[a-zA-Z]+"$/; // Para 'nome = "texto"' apenas com letras
        const regexNome_simples = /^nome\s*=\s*'[a-zA-Z]+'$/; // Para 'nome = 'texto'' apenas com letras
        const regexIdade = /^idade\s*=\s*\d+$/; // Para 'idade = número'
    
        console.log("Valor do primeiro input (nome):", valorNome);
        console.log("Valor do segundo input (idade):", valorIdade);
    
        // Verificando se o primeiro input corresponde ao nome (com aspas simples ou duplas)
        const isNomeValido = regexNome_dupla.test(valorNome) || regexNome_simples.test(valorNome);
        console.log("Nome válido?", isNomeValido);
    
        // Verificando se o segundo input corresponde à idade
        const isIdadeValida = regexIdade.test(valorIdade);
        console.log("Idade válida?", isIdadeValida);
    
        // Verificando as condições e exibindo o alerta correspondente
        if (isNomeValido && isIdadeValida) {
            // Pegando o nome entre aspas e a idade
            const nome = valorNome.match(/['"](.*)['"]/)[1];  // Captura o nome entre aspas
            const idade = valorIdade.match(/\d+/)[0];  // Captura o número da idade
            console.log(nome)
            console.log(idade)
            
            function conteudo2(tag) {
                const elementos = document.querySelectorAll(tag);
                // Remove apenas os últimos 3 inputs
                for (let i = elementos.length - 3; i < elementos.length; i++) {
                    elementos[i].remove();
                }
            }
            // Remover os últimos 3 inputs  
            conteudo2("input");
            let resposta = document.querySelector("input")
            let fundo_abas = document.querySelector('.fundo_abas')
            let botao_reset = document.querySelector(".img_botao_reset")
            let linha_esquerda_vertical_botao_reset = document.querySelector(".linha_vertical_abas_terminal_resposta")
            let botao_testar = document.querySelector(".terminal-button2")
            let insert_button = document.querySelector('.div2')
            fundo_abas.style.width = '72px'
            fundo_abas.style.margin = '0 0 0 48px'
            resposta.style.color = "#fff"
            resposta.value = `Olá, meu nome é ${nome} e tenho ${idade} anos!`
            botao_reset.remove()
            linha_esquerda_vertical_botao_reset.remove()
            botao_testar.remove()
            insert_button.innerHTML = `<button onclick ="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`
            tit.innerText = "Muito Bem! Você declarou suas primeiras variáveis."
        } else {
            tit.innerText = "Formato inválido. Certifique-se de usar:\nnome = \"algum texto que tenha apenas letras\"\nidade = algum número"
        }
    } else if (idConteudo == 26) {
        let campo = document.querySelector(".filho_input");
        
        const valorNome = campo.value.trim();
        // Expressões regulares
        const regexNome_dupla = /^nome\s*=\s*"[a-zA-Z]+"$/; // Para 'nome = "texto"' apenas com letras
        const regexNome_simples = /^nome\s*=\s*'[a-zA-Z]+'$/; // Para 'nome = 'texto'' apenas com letras
        console.log("Valor do primeiro input (nome):", valorNome);
        // Verificando se o primeiro input corresponde ao nome (com aspas simples ou duplas)
        const isNomeValido = regexNome_dupla.test(valorNome) || regexNome_simples.test(valorNome);
        console.log("Nome válido?", isNomeValido);
                // Verificando as condições e exibindo o alerta correspondente
        if (isNomeValido) {
            // Pegando o nome entre aspas e a idade
            const nome = valorNome.match(/['"](.*)['"]/)[1];  // Captura o nome entre aspas
            console.log(nome)
            function conteudo2(tag) {
                const elementos = document.querySelectorAll(tag);
                // Remove apenas os últimos 3 inputs
                for (let i = elementos.length - 3; i < elementos.length; i++) {
                    elementos[i].remove();
                }
            }
            conteudo2("input"); // Remover os últimos 3 inputs
            let resposta = document.querySelectorAll("input")
            let fundo_abas = document.querySelector('.fundo_abas')
            let botao_reset = document.querySelector(".img_botao_reset")
            let linha_esquerda_vertical_botao_reset = document.querySelector(".linha_vertical_abas_terminal_resposta")
            let botao_testar = document.querySelector(".terminal-button2")
            let insert_button = document.querySelector('.div2')
            fundo_abas.style.width = '72px'
            fundo_abas.style.margin = '0 0 0 48px'
            resposta[0].value = `Olá, meu nome é Maria e tenho 18 anos!`
            resposta[1].value = `Olá, meu nome é ${nome} e tenho 18 anos!`
            botao_reset.remove()
            linha_esquerda_vertical_botao_reset.remove()
            botao_testar.remove()
            insert_button.innerHTML = `<button onclick ="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`
            tit.innerText = "Muito bem! Como você comprovou, variáveis recebem novos valores"
        } else {
            tit.innerText = "Formato inválido. Certifique-se de usar:\nnome = \"algum texto e que seja apenas letras\""
        }
    } else if (idConteudo == 31) {
        let filho_input = document.querySelector(".filho_input")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        let fundo_abas = document.querySelector('.fundo_abas')
        let insert_button = document.querySelector('.div2')
        if (filho_input.value == "if") {
            espaco_resposta.innerHTML = `
            <input style="color: #fff;border: none; width: 330px; background: transparent; margin-top: 20px;" type="text" value='Hello World' disabled></input>`
            fundo_abas.style.width = '72px'
            fundo_abas.style.margin = '0 0 0 48px'
            tit.innerText = "Bom trabalho! Você criou uma condição verdadeira."
            insert_button.innerHTML += `<button id="botaoEspecial" class="next">Próximo Conteúdo</button>`;
            // Modifica o onclick do botão para redirecionar para /oasis
            document.getElementById("botaoEspecial").onclick = function() {
                window.location.href = "/conteudos?id_conteudo=32";
            };
            let botao_reset = document.querySelector(".img_botao_reset")
            let linha_esquerda_vertical_botao_reset = document.querySelector(".linha_vertical_abas_terminal_resposta")
            let botao_testar = document.querySelector(".terminal-button2")
            botao_reset.remove()
            linha_esquerda_vertical_botao_reset.remove()
            botao_testar.remove()
        } else {
            tit.innerText = "Você pode tentar de novo!"
        }
    } else if (idConteudo == 33) {
        let filho_input = document.querySelector(".filho_input")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        let fundo_abas = document.querySelector('.fundo_abas')
        let insert_button = document.querySelector('.div2')
        if (filho_input.value == "True") {
            espaco_resposta.innerHTML = `
            <input style="color: #fff;border: none; width: 330px; background: transparent; margin-top: 20px;" type="text" value='Hello World' disabled></input>`
            fundo_abas.style.width = '72px'
            fundo_abas.style.margin = '0 0 0 48px'
            tit.innerText = "Bom trabalho! Você criou uma condição verdadeira."
            insert_button.innerHTML += `<button id="botaoEspecial" class="next">Próximo Conteúdo</button>`;
            // Modifica o onclick do botão para redirecionar para /oasis
            document.getElementById("botaoEspecial").onclick = function() {
                window.location.href = "/conteudos-atividades?id_conteudo=34";
            };
            conteudo(".img_botao_reset")
            conteudo(".linha_vertical_abas_terminal_resposta")
            conteudo(".terminal-button2")
            conteudo(".botoes-resposta")
            conteudo(".botoes-resposta")
        } else {
            tit.innerText = "Você pode tentar de novo!"
        }
    } else if (idConteudo == 34) {
        let filho_input = document.querySelector(".filho_input")
        let espaco_resposta = document.querySelector(".espaco-resposta")
        let fundo_abas = document.querySelector('.fundo_abas')
        let insert_button = document.querySelector('.div2')
        if(filho_input.value == "False") {
            espaco_resposta.innerHTML = `
            <input style="color: #fff;border: none; width: 330px; background: transparent; margin-top: 20px;" type="text" value='' disabled></input>`
            fundo_abas.style.width = '72px'
            fundo_abas.style.margin = '0 0 0 48px'
            tit.innerText = "Bom trabalho! Você criou uma condição que será ignorada.\nAssim, nada será exibido no console."
            insert_button.innerHTML += `<button onclick="carregarProximoConteudo()" class="next">Próximo Conteúdo</button>`;
            conteudo(".img_botao_reset")
            conteudo(".linha_vertical_abas_terminal_resposta")
            conteudo(".terminal-button2")
            conteudo(".botoes-resposta")
            conteudo(".botoes-resposta")
        } else {
            tit.innerText = "Você pode tentar de novo!"
        }
    } else if (idConteudo == 42) {
        carregarProximoConteudo()
    } else if (idConteudo == 44) {
        carregarProximoConteudo()
    } else if (idConteudo == 48) {
        carregarProximoConteudo()
    } else if (idConteudo == 51) {
        // Seleciona todos os inputs com a classe .filho_input
        let inputs = document.querySelectorAll('.filho_input');
        // Verifica se os valores dos inputs atendem às condições
        if (
            inputs[0].value.trim() === "for" &&
            inputs[1].value.trim() === "i" &&
            inputs[2].value.trim() === "in" &&
            inputs[3].value.trim() === "range():"
        ) {
            tit.innerHTML = "Muito bem! Você conseguiu criar a estrutura do for."
            conteudo(".img_botao_reset")
            conteudo(".linha_vertical_abas_terminal_resposta")
            conteudo(".terminal-button2")
            conteudo(".botoes-resposta")
            conteudo(".botoes-resposta")
            conteudo(".botoes-resposta")
            conteudo(".botoes-resposta")
            let insert_button = document.querySelector('.div2');
            insert_button.innerHTML += `<button class="next" onclick="carregarProximoConteudo()">Próximo Conteúdo</button>`;
            // setTimeout(() => {
            //     carregarProximoConteudo()
            // }, 4000)
        } else {
            console.log("Algo está errado!");
            tit.innerText = "Você pode tentar de novo!"
            setTimeout(() => {
                recarregar_pagina()
            }, 4000)
        }
    } else if (idConteudo == 52) {
        let input = document.querySelector('.filho_input');
        let espaco_resposta = document.querySelector(".espaco-resposta");
        let frases = ["Este é o número 1", "Este é o número 2", "Este é o número 3", "Este é o número 4", "Este é o número 5", "Este é o número 6", "Este é o número 7", "Este é o número 8", "Este é o número 9", "Este é o número 10"];
        let valor = input.value.trim();
        let terminal_centro = document.querySelector(".terminal-centro")
        terminal_centro.style.display = "flex";


        espaco_resposta.style.padding = "14px 0 0 30px"
    
        if (!isNaN(valor) && valor !== "") {
            valor = Number(valor); // Converte para número
            espaco_resposta.innerHTML = ""; // Limpa o conteúdo anterior
    
            // Loop baseado no valor
            for (let i = 0; i < valor; i++) {
                // Verifica se há frase correspondente no array
                if (i < frases.length) {
                    espaco_resposta.innerHTML += `${frases[i]}<br>`;
                } else {
                    if ( i >= 10)
                    espaco_resposta.innerHTML += `Este é o número ${i + 1}<br>`;
                    
                }
            }
            tit.innerHTML = `Muito bem! Você determinou quantas vezes o loop irá se repetir `
            conteudo(".img_botao_reset")
            conteudo(".linha_vertical_abas_terminal_resposta")
            conteudo(".terminal-button2")
            let insert_button = document.querySelector('.div2');
            insert_button.innerHTML += `<button class="next" onclick="carregarProximoConteudo()">Próximo Conteúdo</button>`;
        } else {
            tit.innerHTML = "Por favor, insira um número válido!"
            setTimeout(() => {
                recarregar_pagina()
            }, 3500)
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

    // Atualiza o texto do título, se existir
    if (tit) {
        tit.innerText = "Clique em testar para exibir!";
    }

    // Busca elementos .conteudo e .filho_input
    let camposConteudo = document.querySelectorAll('.conteudo');
    let camposFilho = document.querySelectorAll('.filho_input');

    // Determina quais campos usar (.conteudo tem prioridade)
    let campos = camposConteudo.length > 0 ? camposConteudo : camposFilho;

    if (campos.length > 0) {
        // Insere o valor no primeiro campo vazio
        for (let campo of campos) {
            if (campo.value === "") {
                campo.value = botaoClicado.innerText;
                break;
            }
        }

        // Verifica se todos os campos estão preenchidos
        let todosPreenchidos = Array.from(campos).every(campo => campo.value !== "");

        if (todosPreenchidos) {
            // Adiciona a classe "apagado" a todos os botões de resposta
            document.querySelectorAll(".botoes-resposta").forEach(botao => {
                botao.classList.add("apagado");
            });
        }

        // Adiciona a classe "apagado" ao botão clicado
        if (botaoClicado) {
            botaoClicado.classList.add("apagado");
        }

        // Mostra o botão "terminal-button", se existir
        let botaoTestar = document.querySelector('.terminal-button');
        if (botaoTestar) {
            botaoTestar.classList.remove("apagado");
        }
    } else {
        console.warn("Nenhum campo .conteudo ou .filho_input encontrado.");
    }
}
