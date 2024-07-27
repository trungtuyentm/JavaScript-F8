var counter = document.querySelector(".counter");
var btn = document.querySelector(".btn");

var number = 30;
counter.innerText = number;

// Prevent using devtool from removing the disabled attribute inside the button tag to get the link
var timerFinished = false;

// Create default setInterval function
function mySetInterval(callback, time) {
    let start = Date.now();
    let id = null;

    function loop() {
        if (Date.now() - start >= time) {
            callback();
            start = Date.now();
        }
    }

    function animate() {
        id = requestAnimationFrame(animate);
        loop();
    }
    animate();

    return {
        clear: function () {
            cancelAnimationFrame(id);
        },
    };
}

// Countdown timer
function countdownTimer() {
    return mySetInterval(function () {
        number--;
        if (number < 0) {
            btn.disabled = false;
            timerFinished = true;
            timer.clear();
        } else {
            counter.innerText = number;
        }
    }, 1000);
}
let timer = countdownTimer();

// Display countdown timer status on the website
btn.addEventListener("click", function (e) {
    if (!timerFinished) {
        e.preventDefault();
        alert("Please wait for the countdown to finish");
    } else {
        window.location.href = "https://fullstack.edu.vn";
    }
});

// Switch tab to stop countdown timer
window.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        timer.clear();
    } else if (document.visibilityState === "visible") {
        timer = countdownTimer();
    }
});
