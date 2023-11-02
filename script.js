const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let questions;

function loadQuestions() {
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        });
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    } else {
        showResult();
    }
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;
    showQuestion();
}

function showResult() {
    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
    scoreText.textContent = score;
}

loadQuestions();
