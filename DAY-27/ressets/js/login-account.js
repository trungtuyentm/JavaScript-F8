const loginAccountBtn = document.querySelector(".login-account");
const formMain = document.querySelector(".form-main");
const closeBtn1 = document.querySelector(".form-main .overlay");
const closeBtn2 = document.querySelector(".form-main .close");

// Show formMain
loginAccountBtn.addEventListener("click", function () {
    formMain.classList.add("show");
});

// Close formMain by symbol and overlay
closeBtn1.addEventListener("click", function () {
    formMain.classList.remove("show");
});
closeBtn2.addEventListener("click", function () {
    formMain.classList.remove("show");
});

// Close and open by key
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        formMain.classList.add("show");
    }
    if (e.key === "Escape") {
        formMain.classList.remove("show");
    }
});
