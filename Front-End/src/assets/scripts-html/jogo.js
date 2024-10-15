// Lógica para lidar com o progresso e a validação de exercícios

let progress = 0; // Progresso inicial
const totalTasks = 5; // Número total de tarefas em uma fase

// Função para atualizar a barra de progresso
function updateProgress() {
    const progressBar = document.getElementById('progress-fill');
    const progressPercentage = (progress / totalTasks) * 100;
    progressBar.style.width = progressPercentage + '%';
    progressBar.textContent = Math.round(progressPercentage) + '%';

    // Verifica se o jogador completou a fase
    if (progress === totalTasks) {
        alert('Parabéns! Você completou esta fase.');
    }
}

// Função para validar a resposta
function validateAnswer(correctAnswer) {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();

    if (userAnswer === correctAnswer.toLowerCase()) {
        progress++; // Aumenta o progresso ao acertar a resposta
        updateProgress(); // Atualiza a barra de progresso
        alert('Resposta correta!');
    } else {
        alert('Resposta incorreta. Tente novamente.');
    }
}

// Função para enviar resposta ao clicar no botão
function submitAnswer(correctAnswer) {
    validateAnswer(correctAnswer);
}
