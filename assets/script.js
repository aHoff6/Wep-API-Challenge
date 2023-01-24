const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed within ______.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"
  },
  {
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correctAnswer: "console.log"
  },
];
let startDiv = document.getElementById("startDiv");
let questionContainer = document.querySelector("#questionContainer");
let startBtn = document.querySelector("#startBtn");
let answerChoices = document.querySelectorAll(".chosenAnswer");
let questionAsked = document.querySelector("#questionDisplay");
var timerEl = document.querySelector("#time");
let currentQuestion = 0;
let timer = 50
let timerID;

startBtn.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", checkAnswer);

function startQuiz() {
  questionContainer.hidden = false;
  startDiv.setAttribute("hidden", true);
  const question = questions[currentQuestion];
  questionAsked.textContent = question.question;
  for (let i = 0; i < answerChoices.length; i++) {
    answerChoices[i].textContent = question.answers[i];
  }
  timerID = setInterval(countDown, 1000)
   
}
function countDown() {
  if (timer === 0) {
    clearInterval(timerID);
  } 
  timerEl.textContent = timer;
  timer--; 
}

function displayTimer() {
    document.querySelector("#time").textContent = timer;
}


function checkAnswer(event) {
  if (event.target.classList.contains("chosenAnswer")) {
    let userAnswer = event.target.textContent;
    if (userAnswer === questions[currentQuestion].correctAnswer) {
      currentQuestion++;
      if (currentQuestion === questions.length) {
        
      } else {
        startQuiz();
      }
      timer = timer - 10;
    }
  }
}