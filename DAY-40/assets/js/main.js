const startBtn = document.querySelector(".start-btn");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const continueBtn = document.querySelector(".restart");
const exitBtn = document.querySelectorAll(".quit");
const nextBtn = document.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const queText = document.querySelector(".que-text");
const optionList = document.querySelector(".option-list");
const timeLine = document.querySelector(".time-line");
const timeCount = document.querySelector(".timer-sec");
const timeText = document.querySelector(".time-left-text");
const replay = document.querySelector(".replay");
const correctSound = document.querySelector(".correct-sound");
const incorrectSound = document.querySelector(".incorrect-sound");
const victory = document.querySelector(".victory-sound");
const countDownTimer = document.querySelector(".count-down-timer-sound");
const totalQue = document.querySelector(".total-que");

let counter;
let counterLine;
let quesCount = 0;
let userScore = 0;
let timeValue = 15;
let widthValue = 0;

const serverAPI = `https://l9r3pr-8080.csb.app/questions`;
let questions = [];
const fetchQuestion = async () => {
    try {
        const resp = await fetch(serverAPI);
        const data = await resp.json();
        questions = data;
    } catch (error) {
        console.log(`Error fetch the question: ${error}`);
    }
};

const startQuiz = async () => {
    await fetchQuestion();
    startBtn.addEventListener("click", function () {
        startBtn.style.display = "none";
        infoBox.style.display = "block";
    });

    continueBtn.addEventListener("click", function () {
        infoBox.style.display = "none";
        quizBox.style.display = "block";
        startTimerLine(0);
        startTimer(timeValue);
        showQuestion(quesCount);
        queCounter(1);
    });
};
fetchQuestion();
startQuiz();

exitBtn.forEach((exit) => {
    exit.addEventListener("click", function () {
        window.location.reload();
    });
});

nextBtn.addEventListener("click", function () {
    if (quesCount < questions.length - 1) {
        quesCount++;
        showQuestion(quesCount);
        nextBtn.classList.remove("show");
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        queCounter(quesCount + 1);
        timeText.textContent = "Time Left";
    } else {
        quizBox.style.display = "none";
        resultBox.style.display = "block";
        showResult();
    }
});

const showQuestion = (index) => {
    correctSound.pause();
    correctSound.currentTime = 0;
    incorrectSound.pause();
    incorrectSound.currentTime = 0;

    const queTag = `<h2 class="que-number">${questions[index].id}. ${questions[index].question}</h2>`;
    const optionTag = questions[index].options
        .map((option) => `<div class="answer-btn">${option}</div>`)
        .join("");

    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    const options = optionList.querySelectorAll(".answer-btn");
    options.forEach((option) => {
        option.addEventListener("click", () => optionSelected(option));
    });
};

const tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
const crossIconTag =
    '<div class="icon cross"><i class="fas fa-times"></i></div>';

function startTimer(time) {
    let startTime = Date.now();
    const endTime = startTime + time * 1000;
    countDownTimer.play();

    counter = setInterval(() => {
        let remainingTime = Math.max(
            0,
            Math.round((endTime - Date.now()) / 1000)
        );
        timeCount.textContent =
            remainingTime < 10 ? "0" + remainingTime : remainingTime;
        if (remainingTime === 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const correctAnswer = questions[quesCount].answer;
            countDownTimer.pause();
            countDownTimer.currentTime = 0;
            optionList.querySelectorAll(".answer-btn").forEach((option) => {
                if (option.textContent === correctAnswer) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", tickIconTag);
                }
                option.classList.add("disabled");
            });
            nextBtn.classList.add("show");
        }
    }, 1000);
}

function startTimerLine(initialTime) {
    const totalDuration = 15000;
    const maxWidth = 510;
    const intervalDuration = 30;
    let time = initialTime;
    const maxTime = totalDuration / intervalDuration;
    counterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = (time * maxWidth) / maxTime + "px";
        if (time > maxTime) {
            clearInterval(counterLine);
        }
    }, intervalDuration);
}

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    const userAns = answer.textContent;
    const correctAns = questions[quesCount].answer;
    const allOptions = optionList.querySelectorAll(".answer-btn");
    countDownTimer.pause();
    countDownTimer.currentTime = 0;

    if (userAns === correctAns) {
        userScore++;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        correctSound.play();
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        incorrectSound.play();
        allOptions.forEach((option) => {
            if (option.textContent === correctAns) {
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", tickIconTag);
            }
        });
    }
    allOptions.forEach((option) => {
        option.classList.add("disabled");
    });
    nextBtn.classList.add("show");
}

replay.addEventListener("click", function () {
    quesCount = 0;
    userScore = 0;
    timeValue = 15;

    quizBox.style.display = "block";
    resultBox.style.display = "none";

    startTimerLine(0);
    startTimer(timeValue);
    showQuestion(quesCount);
    queCounter(1);
});

const showResult = () => {
    const scoreText = resultBox.querySelector(".score-text");
    if (userScore > 3) {
        let scoreTag = `<div class='score-show'>and congrats! 😍, You got:  
        <span class="number-answer">• Correct : ${userScore}</span>  
        <span class="number-answer">• Incorrect: ${
            questions.length - userScore
        }</span>
        </div>
        `;
        scoreText.innerHTML = scoreTag;
        victory.play();
    } else if (userScore > 1) {
        let scoreTag = `<div class='score-show'>and nice 😎, You got : 
        <span class="number-answer">• Correct : ${userScore}</span>  
        <span class="number-answer">• Incorrect: ${
            questions.length - userScore
        }</span>
        </div>
        `;
        scoreText.innerHTML = scoreTag;
        victory.play();
    } else {
        let scoreTag = `<div class='score-show'>and sorry 😐, You got: 
        <span class="number-answer">• Correct : ${userScore}</span>  
        <span class="number-answer">• Incorrect: ${
            questions.length - userScore
        }</span>
        </div>
         `;
        scoreText.innerHTML = scoreTag;
        victory.play();
    }
};

function queCounter(index) {
    let totalQueCountTag = `<div><span> ${index} </span> of <span> ${questions.length} </span> Questions</div>`;
    totalQue.innerHTML = totalQueCountTag;
}
