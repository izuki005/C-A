let imagem_mundo = document.querySelector("#Mundo"); // tag imagem
let conteudo_mundo = document.querySelector("#texto"); // tag p

function digitarTexto(elemento, texto, velocidade = 20) {
    elemento.innerHTML = ""; // Limpa o conteúdo existente
    let i = 0;

    const intervalo = setInterval(() => {
        if (texto.charAt(i) === "<") {
            // Se encontrar uma tag de abertura "<"
            const closingTagIndex = texto.indexOf(">", i); // Localiza o fechamento da tag
            const tag = texto.slice(i, closingTagIndex + 1); // Extrai a tag completa
            elemento.innerHTML += tag; // Adiciona a tag ao DOM
            i = closingTagIndex + 1; // Avança o índice para depois da tag
        } else {
            elemento.innerHTML += texto.charAt(i); // Adiciona o próximo caractere
            i++;
        }

        if (i >= texto.length) {
            clearInterval(intervalo); // Para o intervalo quando o texto estiver completo
        }
    }, velocidade);
}

setInterval(() => {
    let imagem_url = imagem_mundo.src;

    // Adiciona a classe para a animação de saída
    imagem_mundo.classList.add("animando");
    conteudo_mundo.classList.add("teste");

    setTimeout(() => {
        // Remove a classe de animação para evitar conflitos futuros
        imagem_mundo.classList.remove("animando");
        conteudo_mundo.classList.remove("teste");

        // Verifica qual URL está dentro da tag de imagem e atualiza a imagem e o texto
        if (imagem_url.endsWith("M-deserto.png")) {
            imagem_mundo.src = "../../assets/imgs-html/M-gelo.png";
            digitarTexto(
                conteudo_mundo,
                `Mundo do Gelo<br><br>Aqui vamos visitar alguns iglus, onde avançaremos para o próximo nível com Python.`
            );
        } else if (imagem_url.endsWith("M-gelo.png")) {
            imagem_mundo.src = "../../assets/imgs-html/M-floresta.png";
            digitarTexto(
                conteudo_mundo,
                `Mundo da Floresta<br><br>Vamos desenvolver estruturas mais avançadas com base no que vimos até aqui.`
            );
        } else if (imagem_url.endsWith("M-floresta.png")) {
            imagem_mundo.src = "../../assets/imgs-html/M-vulcao.png";
            digitarTexto(
                conteudo_mundo,
                `Mundo do Vulcão<br><br>Nessa última etapa vamos te ajudar a criar um portífólio para que você possa se desenvolver profissionalmente.`
            );
        } else if (imagem_url.endsWith("M-vulcao.png")) {
            imagem_mundo.src = "../../assets/imgs-html/M-deserto.png";
            digitarTexto(
                conteudo_mundo,
                `Mundo do Deserto<br><br>Aqui podemos andar rumo aos primeiros passos com nossas primeiras linhas de código em Python.`
            );
        }

        console.log("URL atual:", imagem_mundo.src); // Log para acompanhamento
    }, 500); // Tempo para sincronizar com a duração da animação (0.5s = 500ms)
}, 10000);
