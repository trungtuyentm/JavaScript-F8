registerBtn.addEventListener("click", function () {
    loginContent.classList.add("hidden");
    registerContent.style.display = "block";
    Object.assign(registerBtn.style, registerCss);
    Object.assign(loginBtn.style, loginCss);

    resetForm(inputNameRegister, errorName);
    resetForm(inputEmailRegister, errorEmailRegister);
    resetForm(inputPasswordRegister, errorPasswordRegister);
});

const inputNameRegister = document.querySelector("#register-name");
const inputEmailRegister = document.querySelector("#register-email");
const inputPasswordRegister = document.querySelector("#register-password");
const showHideBtnRegister = document.querySelector(
    ".header-register .input-information-login i"
);
const errorName = document.querySelector(".header-register .error-name");
const errorEmailRegister = document.querySelector(
    ".header-register .error-email"
);
const errorPasswordRegister = document.querySelector(
    ".header-register .error-password"
);
const buttonRegister = document.querySelector(".btn-register");
const resultRegister = document.querySelector(".result-register");

// View Password
showHideBtnRegister.addEventListener("click", function () {
    showHidePassword(inputPasswordRegister, showHideBtnRegister);
});

// Blur name
inputNameRegister.addEventListener("blur", function () {
    if (
        !inputNameRegister.value &&
        !inputEmailRegister.value &&
        !inputPasswordRegister.value
    ) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        inputNameRegister.parentElement.classList.add("color");
        inputEmailRegister.parentElement.classList.add("color");
        inputPasswordRegister.parentElement.classList.add("color");
        errorName.classList.add("error");
        errorEmailRegister.classList.add("error");
        errorPasswordRegister.classList.add("error");
    }
});

// Blur Email
inputEmailRegister.addEventListener("blur", function () {
    if (
        !inputNameRegister.value &&
        !inputEmailRegister.value &&
        !inputPasswordRegister.value
    ) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        inputNameRegister.parentElement.classList.add("color");
        inputEmailRegister.parentElement.classList.add("color");
        inputPasswordRegister.parentElement.classList.add("color");
        errorName.classList.add("error");
        errorEmailRegister.classList.add("error");
        errorPasswordRegister.classList.add("error");
    }
});

// Blur Password
inputPasswordRegister.addEventListener("blur", function () {
    if (
        !inputNameRegister.value &&
        !inputEmailRegister.value &&
        !inputPasswordRegister.value
    ) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        inputNameRegister.parentElement.classList.add("color");
        inputEmailRegister.parentElement.classList.add("color");
        inputPasswordRegister.parentElement.classList.add("color");
        errorName.classList.add("error");
        errorEmailRegister.classList.add("error");
        errorPasswordRegister.classList.add("error");
    }
});

// Input Name
inputNameRegister.addEventListener("input", function () {
    if (inputNameRegister.value) {
        errorName.innerText = "";
        inputNameRegister.parentElement.classList.remove("color");
        errorName.classList.remove("error");
    } else {
        errorName.innerText = "Vui lòng nhập thông tin";
        inputNameRegister.parentElement.classList.add("color");
        errorName.classList.add("error");
    }

    if (
        inputNameRegister.value &&
        !inputEmailRegister.value &&
        !inputPasswordRegister.value
    ) {
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.classList.add("error");
        inputEmailRegister.parentElement.classList.add("color");
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
    }
});

// Input Email
inputEmailRegister.addEventListener("input", function () {
    if (checkEmail(inputEmailRegister.value)) {
        errorEmailRegister.innerText = "";
        inputEmailRegister.parentElement.classList.remove("color");
        errorEmailRegister.classList.remove("error");
    } else {
        errorEmailRegister.innerText = "Vui lòng nhập đúng định dạng email";
        errorEmailRegister.classList.add("error");
        inputEmailRegister.parentElement.classList.add("color");
    }

    if (!inputEmailRegister.value) {
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.classList.add("error");
        inputEmailRegister.parentElement.classList.add("color");
    }

    if (
        !inputNameRegister.value &&
        checkEmail(inputEmailRegister.value) &&
        !inputPasswordRegister.value
    ) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorName.classList.add("error");
        inputNameRegister.parentElement.classList.add("color");
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
    }
    if (
        !inputNameRegister.value &&
        !checkEmail(inputEmailRegister.value) &&
        !inputPasswordRegister.value
    ) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorName.classList.add("error");
        inputNameRegister.parentElement.classList.add("color");
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
    }
});

// Input Password
inputPasswordRegister.addEventListener("input", function () {
    if (inputPasswordRegister.value) {
        errorPasswordRegister.innerText = "";
        errorPasswordRegister.classList.remove("error");
        inputPasswordRegister.parentElement.classList.remove("color");
    } else {
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
    }

    if (
        !inputNameRegister.value &&
        !inputEmailRegister.value &&
        inputPasswordRegister.value
    ) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorName.classList.add("error");
        inputNameRegister.parentElement.classList.add("color");
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.classList.add("error");
        inputEmailRegister.parentElement.classList.add("color");
        errorPasswordRegister.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
    }

    if (inputPasswordRegister.value.length >= 6) {
        errorPasswordRegister.innerText = "";
        errorPasswordRegister.classList.remove("error");
        inputPasswordRegister.parentElement.classList.remove("color");
    }

    if (
        inputNameRegister.value &&
        inputEmailRegister.value &&
        inputPasswordRegister.value
    ) {
        errorPasswordRegister.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
        if (inputPasswordRegister.value.length >= 6) {
            errorPasswordRegister.innerText = "";
            errorPasswordRegister.classList.remove("error");
            inputPasswordRegister.parentElement.classList.remove("color");
        }
    }
    if (
        !inputNameRegister.value &&
        inputEmailRegister.value &&
        inputPasswordRegister.value
    ) {
        errorPasswordRegister.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
        if (inputPasswordRegister.value.length >= 6) {
            errorPasswordRegister.innerText = "";
            errorPasswordRegister.classList.remove("error");
            inputPasswordRegister.parentElement.classList.remove("color");
        }
    }
    if (
        inputNameRegister.value &&
        !inputEmailRegister.value &&
        inputPasswordRegister.value
    ) {
        errorPasswordRegister.innerText = "Mật khẩu tối thiểu 6 - 20 ký tự";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
        if (inputPasswordRegister.value.length >= 6) {
            errorPasswordRegister.innerText = "";
            errorPasswordRegister.classList.remove("error");
            inputPasswordRegister.parentElement.classList.remove("color");
        }
    }
});

// Register Button
buttonRegister.addEventListener("click", function () {
    if (!inputNameRegister.value) {
        errorName.innerText = "Vui lòng nhập thông tin";
        errorName.classList.add("error");
        inputNameRegister.parentElement.classList.add("color");
    }
    if (!inputEmailRegister.value) {
        errorEmailRegister.innerText = "Vui lòng nhập thông tin";
        errorEmailRegister.classList.add("error");
        inputEmailRegister.parentElement.classList.add("color");
    }
    if (!inputPasswordRegister.value) {
        errorPasswordRegister.innerText = "Vui lòng nhập thông tin";
        errorPasswordRegister.classList.add("error");
        inputPasswordRegister.parentElement.classList.add("color");
    }
    if (
        inputNameRegister.value &&
        checkEmail(inputEmailRegister.value) &&
        inputPasswordRegister.value.length >= 6
    ) {
        resultRegister.innerText = "Đăng ký thành công";
        resultRegister.classList.add("success");
        setTimeout(function () {
            resetForm(inputNameRegister, errorName);
            resetForm(inputEmailRegister, errorEmailRegister);
            resetForm(inputPasswordRegister, errorPasswordRegister);
        }, 2000);
    }
});
