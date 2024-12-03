// Executa a lógica apenas se estiver na página config.html
if (window.location.pathname.endsWith("/config")) {
    const elementoP = document.querySelector("#fasesCompletadas"); // Seleciona a tag <p>
    if (elementoP && elementoP.textContent.trim() === "Fases completadas: 5") {
        // Envie um sinal ou altere um valor no localStorage para comunicar com inicio.html
        localStorage.setItem("fasesCompletadas", "5");
        console.log("executando, consegui salvar a fase!")
    }
}

// Executa a lógica apenas se estiver na página inicio.html
if (window.location.pathname.endsWith("/inicio-jogo")) {
    console.log("executando!")
    // const imgElement = document.querySelector("img#minhaImagem"); // Selecione sua imagem
    const minhaImagem = document.querySelector('img[src="../../assets/imgs-html/M-gelo-mini-apagado.png"]');
    const fasesCompletadas = localStorage.getItem("fasesCompletadas");
    
    if (minhaImagem && fasesCompletadas === "5") {
        console.log("Imagem encontrada!");
        // Altere a imagem conforme necessário
        minhaImagem.src = "../../assets/imgs-html/M-gelo-mini.png";
    } else {
        console.log("Imagem não encontrada.");
    }
}
