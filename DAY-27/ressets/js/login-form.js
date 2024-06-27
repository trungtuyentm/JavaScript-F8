const loginContent = document.querySelector(".header-login");
const registerContent = document.querySelector(".header-register");
const loginBtn = document.querySelector(".login-register .login");
const registerBtn = document.querySelector(".form .login-register .register");
const showHideBtn = document.querySelector(".form .input-information-login i");

const inputEmailLogin = document.querySelector(
    ".form .input-information-login #login-email"
);
const inputPasswordLogin = document.querySelector(
    ".form .input-information-login #login-password"
);
const errorEmail = document.querySelector(".error-email");
const errorPassword = document.querySelector(".error-password");
const buttonLogin = document.querySelector(".btn-login");
const resultLogin = document.querySelector(".result-login");

var registerCss = {
    background: "var(--button-color)",
    color: "var(--initial-color)",
};
var loginCss = {
    background: "var(--backgroundBtn-color)",
    color: "var(--primary-color)",
};

loginBtn.addEventListener("click", function () {
    loginContent.classList.remove("hidden");
    registerContent.style.display = "none";
    loginBtn.style.background = "var(--button-color)";
    loginBtn.style.color = "var(--initial-color)";
    registerBtn.style.background = "var(--backgroundBtn-color)";
    registerBtn.style.color = "var(--primary-color)";

    resetForm(inputEmailLogin, errorEmail);
    resetForm(inputPasswordLogin, errorPassword);
});

// View Password
showHideBtn.addEventListener("click", function () {
    showHidePassword(inputPasswordLogin, showHideBtn);
});

// Blur Email
inputEmailLogin.addEventListener("blur", function () {
    if (inputEmailLogin.value === "" && inputPasswordLogin.value === "") {
        errorEmail.innerText = "Vui lòng nhập thông tin";
        errorPassword.innerText = "Vui lòng nhập thông tin";
        errorEmail.classList.add("error");
        errorPassword.classList.add("error");
        inputEmailLogin.parentElement.classList.add("color");
        inputPasswordLogin.parentElement.classList.add("color");
    }
});

// Blur Password
inputPasswordLogin.addEventListener("blur", function () {
    if (inputEmailLogin.value === "" && inputPasswordLogin.value === "") {
        errorEmail.innerText = "Vui lòng nhập thông tin";
        errorPassword.innerText = "Vui lòng nhập thông tin";
        errorEmail.classList.add("error");
        errorPassword.classList.add("error");
        inputEmailLogin.parentElement.classList.add("color");
        inputPasswordLogin.parentElement.classList.add("color");
    }
});

// Input Email
inputEmailLogin.addEventListener("input", function () {
    if (checkEmail(inputEmailLogin.value)) {
        errorEmail.innerText = "";
        inputEmailLogin.parentElement.classList.remove("color");
        if (!inputPasswordLogin.value) {
            inputPasswordLogin.parentElement.classList.add("color");
            errorPassword.innerText = "Vui lòng nhập thông tin";
            errorPassword.classList.add("error");
        }
    } else {
        errorEmail.innerText = "Vui lòng nhập đúng định dạng email";
        errorPassword.innerText = "Vui lòng nhập thông tin";
        errorEmail.classList.add("error");
        errorPassword.classList.add("error");
        inputEmailLogin.parentElement.classList.add("color");
        inputPasswordLogin.parentElement.classList.add("color");
    }
    if (inputEmailLogin.value === "") {
        errorEmail.innerText = "Vui lòng nhập thông tin";
        inputEmailLogin.parentElement.classList.add("color");
        errorEmail.classList.add("error");
    }
    if (inputEmailLogin.value === "" && inputPasswordLogin.value) {
        errorPassword.innerText = "";
        inputPasswordLogin.parentElement.classList.remove("color");
        errorPassword.classList.remove("error");
    }
    if (!checkEmail(inputEmailLogin.value) && inputPasswordLogin.value) {
        errorPassword.innerText = "";
        inputEmailLogin.parentElement.classList.remove("color");
        inputPasswordLogin.parentElement.classList.remove("color");
    }
    if (inputPasswordLogin.value) {
        if (!checkEmail(inputEmailLogin.value)) {
            errorEmail.innerText = "Vui lòng nhập đúng định dạng email";
            errorEmail.classList.add("error");
            inputEmailLogin.parentElement.classList.add("color");
        }
        if (!inputEmailLogin.value) {
            errorEmail.innerText = "Vui lòng nhập thông tin";
            errorEmail.classList.add("error");
        }
    }
});

// Input Password
inputPasswordLogin.addEventListener("input", function () {
    if (inputPasswordLogin.value) {
        errorPassword.innerText = "";
        inputPasswordLogin.parentElement.classList.remove("color");
        if (checkEmail(inputEmailLogin.value)) {
            errorEmail.innerText = "";
        }
    } else {
        errorPassword.innerText = "Vui lòng nhập thông tin";
    }
    if (inputPasswordLogin.value && !inputEmailLogin.value) {
        errorEmail.innerText = "Vui lòng nhập thông tin";
        errorEmail.classList.add("error");
        inputEmailLogin.parentElement.classList.add("color");
    }
});

// Login Button
buttonLogin.addEventListener("click", function () {
    if (!inputEmailLogin.value) {
        errorEmail.innerText = "Vui lòng nhập thông tin";
        errorEmail.classList.add("error");
        inputEmailLogin.parentElement.classList.add("color");
    }
    if (!inputPasswordLogin.value) {
        errorPassword.innerText = "Vui lòng nhập thông tin";
        errorPassword.classList.add("error");
        inputPasswordLogin.parentElement.classList.add("color");
    }
    if (checkEmail(inputEmailLogin.value) && inputPasswordLogin.value) {
        setTimeout(function () {
            resultLogin.innerText = "Account not existed";
            resultLogin.classList.add("unsuccess");
        }, 500);
    }
});
