//HTML elements to alter using DOM
let = document.getElementById("quiz");

let resultsEl = document.getElementById("result");

let finalScoreEl = document.getElementById("finalScore");

let gameoverDiv = document.getElementById("gameover");

let questionsEl = document.getElementById("questions");

let quizTimer = document.getElementById("timer");

let startQuizButton = document.getElementById("startbtn");

let startQuizDiv = document.getElementById("startpage");

let highscoreContainer = document.getElementById("highscoreContainer");

let highscoreDiv = document.getElementById("high-scorePage");

let highscoreInputName = document.getElementById("initials");

let highscoreDisplayName = document.getElementById("highscore-initials");

let endGameBtns = document.getElementById("endGameBtns");

let submitScoreBtn = document.getElementById("submitScore");

let highscoreDisplayScore = document.getElementById("highscore-score");
//buttons
let buttonA = document.getElementById("a");
let buttonB = document.getElementById("b");
let buttonC = document.getElementById("c");
let buttonD = document.getElementById("d");

// the questions
let quizQuestions = [{
    question: "What would 'Math.floor(5.3);' return?",
    optionA: "8",
    optionB: "5",
    optionC: "6",
    optionD: "15",
    theAnswer: "b"
},
{
    question: "A block of code designed to perform a particular task, is called what?",
    optionA: "HTML",
    optionB: "Array",
    optionC: "Function",
    optionD: "Event Listener",
    theAnswer: "c"
},
{
    question: "What does the 'debugger' keyword do?",
    optionA: "Stops the execution of JavaScript, and calls the debugging function.",
    optionB: "Fixes any bugs automatically in the JavaScript.",
    optionC: "List all of the bugs in the console.",
    optionD: "Skips any lines of code that contain errors and runs the program as normal.",
    theAnswer: "a"
},
{
    question: "What does API stand for?",
    optionA: "Application Programming Interface",
    optionB: "Algorithms Plus Interaction",
    optionC: "Arrays Programmed Inline",
    optionD: "Assess Problem Indicators",
    theAnswer: "a"
},
{
    question: "What does '!=' mean?",
    optionA: "Only equal.",
    optionB: "Absolutely equal.",
    optionC: "Never equal.",
    optionD: "Not equal.",
    theAnswer: "d"
},
{
    question: "How do you retrieve data from localStorage",
    optionA: "retrieveItem",
    optionB: "getData",
    optionC: "getItem",
    optionD: "retrieveEl",
    theAnswer: "c"
},
{
    question: "What is the purpose of a Boolean() function?",
    optionA: "To check if a number is odd or even.",
    optionB: "To find out if an expression is true or false.",
    optionC: "To run code over and over again, each time with a different value.",
    optionD: "The same as 'console.log'",
    theAnswer: "b"
},
{
    question: "Which of the following is a conditional statement?",
    optionA: "'if'",
    optionB: "'else if'",
    optionC: "'switch'",
    optionD: "All of the above",
    theAnswer: "d"
},
];

// more global scope variables
let finalQuestionIndex = quizQuestions.length;
let currentQuestionIndex = 0;
let timeLeft = 61;
let timerInterval;
let score = 0;
let correct;

// this function goes through an object and creates the answers and questions
function generateQuizQuestion() {
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.optionA;
    buttonB.innerHTML = currentQuestion.optionB;
    buttonC.innerHTML = currentQuestion.optionC;
    buttonD.innerHTML = currentQuestion.optionD;
};

// this function starts everything.
function startQuiz() {

    alert("You have 60 seconds to answer 8 questions.\nIncorrect answers will subtract 15 seconds from timer.\nGood Luck!")

    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //The timer
    timerInterval = setInterval(function () {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            quizTimer.textContent = "Out of Time!"
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    let.style.display = "block";
}
// This function displays your score at the end screen
function showScore() {
    let.style.display = "none"
    gameoverDiv.style.display = "flex";
    quizTimer.textContent = "Timer";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You answered " + score + " out of " + quizQuestions.length + " correct!";
}

// once the submit button is clicked on, the highschore function is run
submitScoreBtn.addEventListener("click", function highscore() {


    if (highscoreInputName.value === "") {
        alert("Please enter your name!");
        return false;
    } else {
        let savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        let currentUser = highscoreInputName.value.trim();
        let currentHighscore = {
            name: currentUser,
            score: score
        };

        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});

// this function clears high schore list and starts a new one
function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    let highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        let newNameSpan = document.createElement("li");
        let newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// shows high score page 
function showHighscore() {

    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// function that clears the high scores in the local storage
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// resets all values. shows home page if they wanna play again
function replayQuiz() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 61;
    score = 0;
    currentQuestionIndex = 0;
}

// this function sees if the answer is correct or not 
function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].theAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        //subtracts time if incorrect :)
        timeLeft -= 15
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    } else {
        showScore();
    }
}

// this is the button that starts the quiz
startQuizButton.addEventListener("click", startQuiz);