// Define your quiz questions
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Mark Language", correct: false },
      { text: "Hyper Tabular Markup Language", correct: false },
      { text: "None of these", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "What does JS stand for?",
    answers: [
      { text: "JavaSuper", correct: false },
      { text: "JustScript", correct: false },
      { text: "JavaScript", correct: true },
      { text: "JScript", correct: false }
    ]
  }
];

// Get references to elements
const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

// Start or restart the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add("hide");
  nextBtn.innerText = "Next";
  showQuestion();
}

// Load the current question
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.onclick = () => selectAnswer(button, answer.correct);
    li.appendChild(button);
    answerButtons.appendChild(li);
  });
}

// Clear previous answers
function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

// Handle answer selection
function selectAnswer(button, isCorrect) {
  // Disable all buttons
  const buttons = answerButtons.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  // Show feedback
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    // Also highlight correct one
    const buttons = answerButtons.querySelectorAll("button");
    questions[currentQuestionIndex].answers.forEach((ans, idx) => {
      if (ans.correct) {
        buttons[idx].classList.add("correct");
      }
    });
  }

  nextBtn.style.display = "inline-block";
}

// Handle "Next" button click
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

// Show final score
function showScore() {
  questionEl.innerText = "";
  answerButtons.innerHTML = "";
  nextBtn.style.display = "none";
  resultBox.classList.remove("hide");
  scoreDisplay.innerText = `${score} / ${questions.length}`;
}

// Load the first question
startQuiz();
