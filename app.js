const startBtn = document.getElementById('start');
const boxWrap = document.getElementById('boxwrap');
const answerButtons = document.getElementById('answer-buttons');
const quizQuestions = document.querySelector('.quizquestions');
const questionTxt = document.getElementById('question-text');
const questionnum = document.querySelector('.question-num');
const next = document.getElementById('next');
const presentScore= document.getElementById('presentScore');
const presentScoreMain= document.getElementById('presemtscore-main');
const timer = document.querySelector('.timer');
const musictxt = document.querySelector('#musictxt');
const music = document.querySelector('.music');
const musicSrc = document.querySelector('#music-src');
const startPage = document.querySelector('#start-page');
const hallbtn = document.querySelector('#hall');
const quizBox = document.querySelector('.quizbox');
const backButton = document.querySelector('#back');
const highScoreElement = document.querySelector('#high-scores');
const highScore1 = document.querySelector('#high1');
const highScore2 = document.querySelector('#high2');
const highScore3 = document.querySelector('#high3');
const highScore4 = document.querySelector('#high4');
const highScore5 = document.querySelector('#high5');
const hallInput = document.querySelector('#hallinput');
const inputBtn = document.querySelector('#inputBtn');

let score = 0;
let currentQuestionIndex = 0;
let myInterval1;
let time1 = 10;
let allQuestions = [];

startBtn.addEventListener('click', startQuiz);
backButton.addEventListener('click',backbtn);
hallbtn.addEventListener('click', hallFame);
next.addEventListener('click', nextQ);
inputBtn.addEventListener('click', saveHighScore);

async function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    startPage.style.display = "none";
    quizBox.style.display = "flex";
    await fetchQuestions();
    showQuestion();
    startTimer();
}

async function fetchQuestions() {
    const res = await axios.get("https://opentdb.com/api.php?amount=10");
    allQuestions = res.data.results;
}

function showQuestion() {
    if (currentQuestionIndex < allQuestions.length) {
        const currentQuestion = allQuestions[currentQuestionIndex];
        questionnum.innerHTML = `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
        presentScore.innerHTML = score;
        questionTxt.innerHTML = currentQuestion.question;
        answerButtons.innerHTML = '';

        let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        answers = answers.sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            const ansbtn = document.createElement('button');
            ansbtn.innerText = answer;
            ansbtn.setAttribute('correct', answer === currentQuestion.correct_answer);
            ansbtn.addEventListener('click', function() {
                checkAnswer(ansbtn, answer === currentQuestion.correct_answer);
            });
            answerButtons.appendChild(ansbtn);
        });

        next.style.display = 'none'; 
    } else {
        showScore();

    }
}

function checkAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add('correct');
        score++;
    } else {
        button.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn.getAttribute('correct') === 'true') {
            btn.classList.add('correct');
        }
    });

    next.style.display = 'block';
    stopTimer();
}

function handleNxtbtn() {
        console.log(currentQuestionIndex);
        stopTimer();
        
        if (currentQuestionIndex < allQuestions.length-1) {
            currentQuestionIndex++;
            console.log(currentQuestionIndex);
            next.style.display = 'none';
            showQuestion();
            startTimer();
    
        } else {
            stopTimer();
            showScore();
        }
}
    
function nextQ(){
    startTimer();
    timer.innerHTML = '';
    if (currentQuestionIndex <= allQuestions.length-1) {
        handleNxtbtn();
    } 
}
    
function startTimer() {
    time1 = 10;
    myInterval1 = setInterval(myTimerFunc, 1000);
} 

function myTimerFunc() {
    timer.innerHTML = 'Time left: ' + time1 + 's';
    if (time1 === 0) {
        Array.from(answerButtons.children).forEach(button => {
            if (button.getAttribute('correct') === 'true') {
                button.classList.add('correct');
            }
            next.style.display = 'block';
            button.disabled = true;
        });
        timer.innerHTML = 'Oops! Time\'s up'; 
        clearInterval(myInterval1);
    }
    time1--; 
}

function stopTimer() { 
    clearInterval(myInterval1);
} 

function showScore() {
    console.log('showscore');
    timer.style.display = 'none';
    presentScore.innerHTML = 'Game Over';
    quizQuestions.style.display = 'none';
    inputBtn.style.display = 'flex';
    hallInput.style.display = 'flex';
    const totalScore = document.createElement('h1');
    totalScore.setAttribute('id', 'total-score');
    quizBox.appendChild(totalScore);
    totalScore.innerHTML = `You scored ${score} out of ${allQuestions.length}!`;
    displayHighScores();
    highScoreElement.style.display = 'block';
    inputBtn.addEventListener('click',saveHighScore);
}

function saveHighScore() {
    let highScoreName = hallInput.value.trim();
    if (highScoreName) {
        const highScores = getHighScores();
        highScores.push({ name: highScoreName, score: score });
        highScores.sort((a, b) => b.score - a.score);
        highScores.splice(5);   
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores();
    }
    inputBtn.style.display = 'none';
    hallInput.style.display = 'none';
}

function getHighScores() {
    const scores = localStorage.getItem('highScores');
    return scores ? JSON.parse(scores) : [];
}

function displayHighScores() {
    const highScores = getHighScores().slice(0, 5);  
    const highScoreElements = [highScore1, highScore2, highScore3, highScore4, highScore5];
    highScores.forEach((score, index) => {
        if (highScoreElements[index]) {
            highScoreElements[index].textContent = `${Object.values(score)[0]}: ${Object.values(score)[1]}`;
        }
    });

    for (let i = highScores.length; i < highScoreElements.length; i++) {
        if (highScoreElements[i]) {
            highScoreElements[i].textContent = '';
        }
    }
}

function hallFame() {
    quizBox.style.display = 'flex';
    boxWrap.style.display = 'none'
    startPage.style.display = 'none';
    highScoreElement.style.display = 'block';
    displayHighScores();
    saveHighScore();
} 

function backbtn(){
    startPage.style.display = "flex";
    timer.style.display = 'block';
    boxWrap.style.display = 'block';
    inputBtn.style.display = 'none';
    hallInput.style.display = 'none';
    quizBox.style.display = "none";
    highScoreElement.style.display = 'none';
    quizQuestions.style.display = 'flex';
    const totalScore = document.getElementById('total-score');
    if (totalScore) {
        totalScore.remove();
    }
}

