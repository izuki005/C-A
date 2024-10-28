// let idConteudo = !{id_conteudo};  // Inicializa com o ID do conteúdo atual

function carregarProximoConteudo() {
    idConteudo += 1;  // Incrementa o ID do conteúdo
    window.location.href = `/conteudos?id_conteudo=${idConteudo}`;  // Redireciona para a mesma rota com o novo ID
    if (idConteudo > 3){
        window.location.href = '/conteudos-imgs'
        //deve ser colocador as imagens
    }
}
    
function carregarConteudoAnterior() {
    if (idConteudo > 1) {  // Impede que o ID seja menor que 1
        idConteudo -= 1;  // Decrementa o ID do conteúdo
        window.location.href = `/conteudos?id_conteudo=${idConteudo}`;  // Redireciona para a mesma rota com o novo ID
    }else if (idConteudo <= 1) {
        window.location.href = '/oasis'
    }
}
