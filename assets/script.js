const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts"
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ______.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"
  },
  {
    question: "Arrays in JavaScript can be used to store ______.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above"
    ],
    correctAnswer: "all of the above"
  },
  {
    question:
      "String values must be enclosed within _______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correctAnswer: "console.log"
  },
];
const startDiv = document.getElementById("startDiv");
const questionContainer = document.querySelector("#questionContainer");
const startBtn = document.querySelector("#startBtn");
const answerChoices = document.querySelectorAll(".chosenAnswer");
const questionAsked = document.querySelector("#questionDisplay");
const timerEl = document.querySelector("#time");
const highScoreDisplayEl = document.querySelector("#displayHighScore");
const userScoreEl = document.getElementById("userScore");
const userInitialsEl = document.getElementById("initials");
const scoreContainerEl = document.getElementById("score");
const answerAlertEl = document.getElementById("answerAlert");
const submitScoreBtn = document.getElementById("submitScore");
let highScoreArray = JSON.parse(localStorage.getItem("scores")) || [];
let currentQuestion = 0;
let timer = 50,
  running = false;
let timerID;

// starting quiz by setting hidden to false for questions and timer / hiding starter page / calls display quiz function
function startQuiz() {
  questionContainer.hidden = false;
  timerEl.hidden = false;
  startDiv.setAttribute("hidden", true);
  timer.running = true;
  // setting interval timers countdown and calling it
  timerID = setInterval(countDown, 1000);
  displayQuiz();
}

// displays quiz container by iterating through questions array
function displayQuiz() {
  const question = questions[currentQuestion];
  questionAsked.textContent = question.question;
  for (let i = 0; i < answerChoices.length; i++) {
    answerChoices[i].textContent = question.answers[i];
  }
}

// timer decreasing function
function countDown() {
  if (timer === 0) {
    clearInterval(timerID);
  } else if (running == true) {
    return;
  }
  timerEl.textContent = timer;
  timer--;
}
// checking if what the user chose matches the questions correct answer
function checkingIfCorrect(userChoice) {
  return userChoice.textContent === questions[currentQuestion].correctAnswer;
}

// defining users chosen answer by event targeting / displaying alert if right or wrong / subtracting 10 secs from timer if answered wrong
// increases currentQuestion index to display next question / if more questions, run display quiz again with new currentQuestion index if not ends quiz
function checkAnswer(event) {
  let userChoice = event.target;
  answerAlertEl.style.display = "flex";
  let alertDisplay = document.getElementById("alertDisplay");

  if (checkingIfCorrect(userChoice)) {
    alertDisplay.textContent = "Correct!";
  } else {
    alertDisplay.textContent = "Incorrect!";
    if (timer >= 10) {
      timer -= 10;
    } else {
      timer = 0;
    }
  }
  timerEl.textContent = timer;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuiz();
  } else {
    return endQuiz();
  }
}

// saves users entered initials and users timer score to local storage array
function saveData() {
  let currentUserScore = timerEl.textContent.trim();
  let initials = userInitialsEl.value.trim();
  highScoreArray.push({ currentUserScore, initials });
  localStorage.setItem("scores", JSON.stringify(highScoreArray));
  console.log(currentUserScore);
  console.log(initials);
}

// displays users timer score  / hides unwanted containers for end page 
function endQuiz() {
  userScoreEl.textContent = timer;
  timerEl.hidden = true;
  questionContainer.hidden = true;
  scoreContainerEl.hidden = false;
}

//TODO function for high scores display 




startBtn.addEventListener("click", startQuiz);
questionContainer.addEventListener("click", checkAnswer);
submitScoreBtn.addEventListener("click", saveData);
