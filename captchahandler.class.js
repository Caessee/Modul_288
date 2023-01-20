class CaptchaHandler {
    constructor(input, generateBtn, image) {
        this.input = input;
        this.generateBtn = generateBtn;
        this.image = image;

        input.captchahandler = this;
        generateBtn.captchahandler = this;

        generateBtn.addEventListener("click", e => { e.target.captchahandler.generate(e.target.captchahandler) });
        generateBtn.click();
    }

    generate(captchahandler) {
        // Clear old input
        captchahandler.input.value = "";

        // Access the element to store
        // the generated captcha
        var uniquechar = "";

        const randomchar =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        // Generate captcha for length of
        // 5 with random character
        for (let i = 0; i < 7; i++) {
            uniquechar += randomchar.charAt(Math.random() * randomchar.length)
        }

        this.lastCaptcha = uniquechar;
        // Store generated input
        captchahandler.image.innerHTML = uniquechar;
    }

    validate() {
        return this.input.value == this.lastCaptcha;
    }
}