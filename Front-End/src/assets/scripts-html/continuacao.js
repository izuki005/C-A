// setTimeout(() => {
//     if (window.location.pathname.endsWith("/config")) {
//         const elementoP = document.querySelector("#fasesCompletadas"); // Seleciona a tag <p>
//         if (elementoP) {
//             const texto = elementoP.textContent.trim();
//             const match = texto.match(/\d+/); // Extrai o número do texto
//             if (match) {
//                 const faseAtual = parseInt(match[0], 10); // Converte para número
//                 const faseAtualArmazenada = localStorage.getItem("faseAtual");
//                 if (faseAtualArmazenada !== String(faseAtual)) {
//                     localStorage.setItem("faseAtual", String(faseAtual)); // Salva como string
//                     console.log(`Fase ${faseAtual} salva no Local Storage!`);
//                 }
//             }
//         }
//     }
// }, 1000)

if (window.location.pathname.endsWith("/inicio-jogo")) {
    const minhaImagem = document.querySelector('img[src="../../assets/imgs-html/M-gelo-mini-apagado.png"]');
    const faseAtual = localStorage.getItem("faseAtual");
    if (minhaImagem && faseAtual === "5") {
        console.log("Imagem encontrada e fase 5 verificada!");
        minhaImagem.src = "../../assets/imgs-html/M-gelo-mini.png";
    }
}
