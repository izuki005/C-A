if (window.location.pathname.endsWith("/inicio-jogo")) {
    const minhaImagem = document.querySelector('img[src="../../assets/imgs-html/M-gelo-mini-apagado.png"]');
    const faseAtual = localStorage.getItem("faseAtual");
    if (minhaImagem && faseAtual === "5") {
        console.log("Imagem encontrada e fase 5 verificada!");
        minhaImagem.src = "../../assets/imgs-html/M-gelo-mini.png";
    }
}
