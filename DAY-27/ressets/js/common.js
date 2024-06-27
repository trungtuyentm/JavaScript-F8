// Show & hide password
var showHidePassword = function (inputPassword, eyesPassword) {
    if (inputPassword.getAttribute("type") === "password") {
        inputPassword.setAttribute("type", "text");
        eyesPassword.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        inputPassword.setAttribute("type", "password");
        eyesPassword.classList.replace("bi-eye-slash", "bi-eye");
    }
};

// Check Email
var checkEmail = function (inputEmail) {
    var reg = /^\w+@[a-zA-Z]{3,}\.com$/i;
    return reg.test(inputEmail);
};

// Reset Form
var resetForm = function (inputElement, error) {
    inputElement.form.reset();
    if (inputElement.value === "") {
        error.innerText = "";
        error.classList.remove("error");
        inputElement.parentElement.classList.remove("color");

        resultLogin.innerText = "";
        resultLogin.classList.remove("result");
        resultRegister.innerText = "";
        resultRegister.classList.remove("success");
    }
};
