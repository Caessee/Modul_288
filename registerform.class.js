class RegisterForm {
    constructor(nameInput, emailInput, pwInput, submitBtn, errorList, captchaHandler) {
        this.inputs = [nameInput, emailInput, pwInput];
        this.submitBtn = submitBtn;
        this.errorList = errorList;
        this.captchaHandler = captchaHandler;
        this.strengthBadge = pwInput.parentElement.getElementsByClassName("pw-strength")[0];

        nameInput.registerform = this;
        emailInput.registerform = this;
        pwInput.registerform = this;
        captchaHandler.input.registerform = this;

        nameInput.addEventListener('input', this.validate);
        emailInput.addEventListener('input', this.validate);
        pwInput.addEventListener('input', this.validate);
        captchaHandler.input.addEventListener('input', this.validate);
    }

    validate(event) {
        const registerform = event.target.registerform;
        registerform.pwStrengthChecker(registerform);
        if (registerform.checkLength(registerform) && registerform.validateEmail(registerform) && registerform.validatePw(registerform) && registerform.validateCaptcha(registerform)) {
            registerform.submitBtn.disabled = false;
        } else {
            registerform.submitBtn.disabled = true;
        }
    }

    checkLength(registerform) {
        for (let inp of registerform.inputs) {
            if (inp.value.length < 3) {
                registerform.errorList.addError("LENGTH");
                return false;
            }
        }
        registerform.errorList.removeError("LENGTH");
        return true;
    }

    validateEmail(registerform) {
        let check = /.{3}@.{3}[.].{2,3}/.test(registerform.inputs[1].value);
        if (!check) {
            registerform.errorList.addError("EMAIL");
        } else {
            registerform.errorList.removeError("EMAIL");
        }
        return check;
    }

    validatePw(registerform) {
        let checkLength = registerform.inputs[2].value.length >= 8;
        if (!checkLength) {
            registerform.errorList.addError("PW_LENGTH");
        } else {
            registerform.errorList.removeError("PW_LENGTH");
        }
        let checkStrength = registerform.inputs[2].strength;
        if (!checkStrength) {
            registerform.errorList.addError("PW_STRENGTH");
        } else {
            registerform.errorList.removeError("PW_STRENGTH");
        }
        return checkLength && checkStrength;
    }

    pwStrengthChecker(registerform) {
        if (registerform.inputs[2].value.length == 0) {
            registerform.strengthBadge.style.display = "none";
            return;
        } else {
            registerform.strengthBadge.style.display = "block";
        }

        //Minimum: 1 Upercase letter, 1 Lowercase letter, 1 digit, 1 special char
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])');
        //Minimum: 1 Upercase letter, 1 Lowercase letter, 1 special char
        let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]))');

        if (strongPassword.test(registerform.inputs[2].value)) {
            registerform.inputs[2].strength = true;
            registerform.strengthBadge.style.backgroundColor = "green";
            registerform.strengthBadge.textContent = 'Stark';
        } else if (mediumPassword.test(registerform.inputs[2].value)) {
            registerform.inputs[2].strength = true;
            registerform.strengthBadge.style.backgroundColor = 'orange';
            registerform.strengthBadge.textContent = 'Mittel';
        } else {
            registerform.inputs[2].strength = false;
            registerform.strengthBadge.style.backgroundColor = 'red';
            registerform.strengthBadge.textContent = 'Schwach';
        }
    }

    validateCaptcha(registerform) {
        let check = registerform.captchaHandler.validate();
        if (!check) {
            registerform.errorList.addError("CAPTCHA");
        } else {
            registerform.errorList.removeError("CAPTCHA");
        }
        return check;
    }
}