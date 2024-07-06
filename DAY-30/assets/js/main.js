var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector(".span");
var progressBarWidth = progressBar.clientWidth;
var moveSpace = 0;
var lastMoveSpace = 0;
var initialClientX = 0;
var isDragging = false;
var isClicked = false;
var hoverPosition = null;

// ProgressBar mousedown
progressBar.addEventListener("mousedown", function (e) {
    if (e.which !== 1) return;
    var offsetX = e.offsetX;
    var rate = (offsetX / progressBarWidth) * 100;
    progress.style.width = `${rate}%`;
    moveSpace = offsetX;
    initialClientX = e.clientX;
    lastMoveSpace = offsetX;
    isDragging = true;
    isClicked = true;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
});

// ProgressSpan mousedown
progressSpan.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    initialClientX = e.clientX;
    lastMoveSpace = (audio.currentTime / audio.duration) * progressBarWidth;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
    isDragging = true;
    isClicked = true;
});

// Mouse up handler function
function handleMouseUp(e) {
    isDragging = false;
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleMouseUp);
    lastMoveSpace = moveSpace;
    if (isClicked) {
        var rate = (moveSpace / progressBarWidth) * 100;
        updateAudioTime(rate);
    }
    isClicked = false;
}

// Move handler function
function handleDrag(e) {
    if (!isDragging) return;
    var currentClientX = e.clientX;
    var distance = currentClientX - initialClientX;
    moveSpace = lastMoveSpace + distance;
    if (moveSpace < 0) {
        moveSpace = 0;
    } else if (moveSpace > progressBarWidth) {
        moveSpace = progressBarWidth;
    }
    var rate = (moveSpace / progressBarWidth) * 100;
    progress.style.width = `${rate}%`;

    // When holding and dragging the preview time appears
    if (isDragging && isClicked) {
        span.innerText = getTimeFormat(
            Math.round((moveSpace / progressBarWidth) * audio.duration)
        );
        var css = {
            left: `${moveSpace}px`,
        };
        Object.assign(span.style, css);
        span.style.display = "inline-block";
    }
}

// Handle Audio
var audio = document.querySelector("audio");
var durationEl = document.querySelector(".time .duration");
var currentTimeEl = document.querySelector(".time .current-time");
var playActionEl = document.querySelector(".control .play i");
var diskInner = document.querySelector(".disk-inner");

var getTimeFormat = function (seconds) {
    var mins = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds - mins * 60);
    return `${mins < 10 ? "0" + mins : mins}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
};

// Check status songs
playActionEl.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// Play songs
audio.addEventListener("play", function () {
    playActionEl.classList.replace("fa-play", "fa-pause");
    diskInner.classList.add("play");
});

// Pause songs
audio.addEventListener("pause", function () {
    playActionEl.classList.replace("fa-pause", "fa-play");
    diskInner.classList.remove("play");
});

// Add current the time of songs on the website and the background of current time
audio.addEventListener("timeupdate", function () {
    var currentTime = audio.currentTime;
    currentTimeEl.innerText = getTimeFormat(currentTime);
    if (!isDragging) {
        var rate = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${rate}%`;
    }
});

// Add song duration on the website
window.addEventListener("load", function () {
    durationEl.innerText = getTimeFormat(audio.duration);
});

// Update audio time
function updateAudioTime(value) {
    audio.currentTime = (audio.duration * value) / 100;
}

// Reset everything when audio ends
audio.addEventListener("ended", function () {
    audio.currentTime = 0;
    progress.style.width = "0%";
    currentTimeEl.innerText = getTimeFormat(0);
    playActionEl.classList.replace("fa-pause", "fa-play");
    diskInner.classList.remove("play");
});

// Preview time on progress bar hover
var span = document.createElement("span");
span.style.position = "absolute";
span.style.transform = "translate(-50%, -30px)";
span.style.backgroundColor = "cyan";
span.style.color = "#0d286d";
span.style.padding = "1px 4px";
span.style.borderRadius = "6px";
span.style.display = "none";
progressBar.appendChild(span);

// Handle mouse move on progress bar
progressBar.addEventListener("mousemove", function (e) {
    var mouseX = e.clientX - progressBar.getBoundingClientRect().left;
    if (isDragging || (!isClicked && mouseX < 0)) return;
    var moveSpace = mouseX > progressBarWidth ? progressBarWidth : mouseX;
    var rate = (moveSpace / progressBarWidth) * 100;
    span.innerText = getTimeFormat(Math.round(rate * (audio.duration / 100)));
    var css = {
        left: `${moveSpace}px`,
    };
    Object.assign(span.style, css);
    span.style.display = "inline-block";
});

// Handle mouse leave from progress bar
progressBar.addEventListener("mouseleave", function () {
    span.style.display = "none";
});
