var carouselInner = document.querySelector(".carousel-inner");
var nextBtn = document.querySelector(".carousel .next");
var prevBtn = document.querySelector(".carousel .prev");
var carousel = document.querySelector(".carousel");
var children = document.querySelectorAll(".carousel-inner > .item");

// Calculate width of carousel-inner
var itemWidth = carouselInner.clientWidth;

// Calculate total width
var totalWidth = carouselInner.children.length * itemWidth;
var position = 0;

// Create the circle block
var circleBlock = document.createElement("div");
circleBlock.className = "circle-block";
carousel.appendChild(circleBlock);

for (var i = 0; i < children.length; i++) {
    const circle = document.createElement("div");
    circle.className = "circle";
    circleBlock.appendChild(circle);
}

// Active dots
var circleBtn = document.querySelectorAll(".circle");
circleBtn.forEach(function (value, index) {
    value.addEventListener("click", function () {
        removeActive();
        value.classList.add("active");
        position = -index * itemWidth;
        carouselInner.style.translate = `${position}px`;
        carouselInner.style.transition = "1s";
    });
});

// Remove active
function removeActive() {
    var activeCircle = document.querySelector(".circle.active");
    if (activeCircle) {
        activeCircle.classList.remove("active");
    }
}

// Next button
function nextButton() {
    if (Math.abs(position) + itemWidth >= totalWidth) {
        return;
    }
    position -= itemWidth;
    carouselInner.style.translate = `${position}px`;
    carouselInner.style.transition = "1s";
    handleMoveDot();
}

// Previous button
function previousButton() {
    if (Math.abs(position) === 0) {
        return;
    }
    position += itemWidth;
    carouselInner.style.translate = `${position}px`;
    carouselInner.style.transition = "1s";
    handleMoveDot();
}

// Handle dots move follow navigation
function handleMoveDot() {
    var indexDot = Math.abs(position / itemWidth);
    removeActive();
    circleBlock.children[indexDot].classList.add("active");
}

// Swipe the image
var startClientX = null;
var distanceMove = null;

carouselInner.addEventListener("mousedown", function (e) {
    e.preventDefault();
    startClientX = e.clientX;
    this.style.cursor = "grabbing";
    this.addEventListener("mousemove", handleMoveSlide);
});

carouselInner.addEventListener("mouseup", function (e) {
    e.preventDefault();
    this.style.cursor = "default";
    this.removeEventListener("mousemove", handleMoveSlide);
    if (Math.abs(distanceMove) / Math.abs(itemWidth) > 0.2) {
        distanceMove > 0 ? previousButton() : nextButton();
    } else {
        carouselInner.style.translate = `${position}px`;
    }
});

function handleMoveSlide(e) {
    var moveAfterClientX = e.clientX;
    distanceMove = moveAfterClientX - startClientX;
    if (
        (Math.abs(position) + itemWidth >= totalWidth && distanceMove < 0) ||
        (Math.abs(position) === 0 && distanceMove > 0)
    ) {
        return;
    }
    carouselInner.style.translate = `${position + distanceMove}px`;
}

nextBtn.addEventListener("click", nextButton);
prevBtn.addEventListener("click", previousButton);

// Initialize the first active circle
circleBlock.children[0].classList.add("active");
