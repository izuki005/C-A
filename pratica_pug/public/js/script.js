var contador = 0

function escrever(){
    let botao_teste = document.getElementById('botao_teste1').innerText
    // let titulo = document.getElementById('h1')
    if(contador == 0){
        let paragrafo1 = document.getElementsByClassName('p')[contador]
        paragrafo1.innerHTML = botao_teste
        contador ++
    }else if(contador > 1) {
        contador = 0
    }else {
        let paragrafo2 = document.getElementsByClassName('p')[contador]
        paragrafo2.innerHTML = botao_teste
        contador ++
    }
}
function escrever2(){
    let botao_teste = document.getElementById('botao_teste2').innerText
    // let titulo = document.getElementById('h1')
    if(contador == 1){
        let paragrafo2 = document.getElementsByClassName('p')[contador]
        paragrafo2.innerHTML = botao_teste
        contador ++
    }else if(contador > 1) {
        contador = 0
    }else {
        let paragrafo2 = document.getElementsByClassName('p')[contador]
        paragrafo2.innerHTML = botao_teste
        contador ++
    }
}
