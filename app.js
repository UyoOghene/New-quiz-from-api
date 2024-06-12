const startBtn = document.getElementById('start');
const boxWrap = document.getElementById('boxwrap');
const answerButtons = document.getElementById('answer-buttons');
const quizQuestions = document.querySelector('.quizquestions');
const questionTxt = document.getElementById('question-text');
const questionnum = document.querySelector('.question-num')
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

startBtn.addEventListener('click', startQuiz);


function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    startPage.style.display = "none";
    quizBox.style.display = "flex";
    showQuestion();
}


async function showQuestion(){ 
        const res = await axios.get("https://opentdb.com/api.php?amount=10"); 
        const allQuestions = res.data.results;
            if (currentQuestionIndex < allQuestions.length) {
                const currentQuestion = allQuestions[currentQuestionIndex];
                questionnum.innerHTML = `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
                presentScore.innerHTML = score;
                questionTxt.innerHTML = currentQuestion.question;
        }
}

