const EMAIL = "test@test.ch";
const PASSWORD = "password123";

class LoginForm {
    constructor(emailInput, pwInput, submitBtn, errorList, captchaHandler) {
        this.inputs = [emailInput, pwInput];
        this.submitBtn = submitBtn;
        this.errorList = errorList;
        this.captchaHandler = captchaHandler;

        emailInput.loginform = this;
        pwInput.loginform = this;
        captchaHandler.input.loginform = this;
        submitBtn.loginform = this;
        submitBtn.emailInput = emailInput;
        submitBtn.pwInput = pwInput;

        emailInput.addEventListener('input', this.validate);
        pwInput.addEventListener('input', this.validate);
        captchaHandler.input.addEventListener('input', this.validate);
        submitBtn.addEventListener('click', this.checkLogin);
    }

    validate(event) {
        const loginform = event.target.loginform;
        if (loginform.checkLength(loginform) && loginform.validateCaptcha(loginform)) {
            loginform.submitBtn.disabled = false;
        } else {
            loginform.submitBtn.disabled = true;
        }
    }

    checkLength(loginform) {
        for (let inp of loginform.inputs) {
            if (inp.value.length < 3) {
                loginform.errorList.addError("LENGTH");
                return false;
            }
        }
        loginform.errorList.removeError("LENGTH");
        return true;
    }

    validateCaptcha(loginform) {
        let check = loginform.captchaHandler.validate();
        if (!check) {
            loginform.errorList.addError("CAPTCHA");
        } else {
            loginform.errorList.removeError("CAPTCHA");
        }
        return check;
    }

    checkLogin(event) {
        var submitBtn = event.target;
        var email = submitBtn.emailInput.value;
        var pw = submitBtn.pwInput.value;

        let check = submitBtn.loginform.captchaHandler.validate();

        if (email == EMAIL && pw == PASSWORD && check) {
            alert('Login successful!');
        } else if (check) {
            alert('Incorrect username or password!');
        } else {
            //For safety: Should never happen because cant submit if Captcha input is wrong
            alert('Invalid Captcha input');
        }
    }
}