class ErrorList {


    constructor(errorlistEl) {
        this.errorlistEl = errorlistEl;
        this.ERROR_MSG = new Map();
        this.ERROR_MSG.set("LENGTH", "Bitte alle Felder ausfüllen (Mind. 3 Zeichen)");
        this.ERROR_MSG.set("PW_LENGTH", "Das Password muss mindestens 8 Zeichen lang sein");
        this.ERROR_MSG.set("PW_STRENGTH", "Das Password muss genug stark sein");
        this.ERROR_MSG.set("EMAIL", "Bitte eine valide E-Mail Adresse angeben");
        this.ERROR_MSG.set("CAPTCHA", "Bitte gib den korrekten Wert des Captcha an");
    }

    addError(errorMsgKey) {
        let errorMsg = this.ERROR_MSG.get(errorMsgKey);
        const errorlist = this.errorlistEl.getElementsByTagName("li");
        for (let i = 0; i < errorlist.length; i++) {
            if (errorlist[i].innerHTML == errorMsg) {
                return;
            }
        }
        this.errorlistEl.appendChild(document.createElement("li")).innerHTML = errorMsg;
    }

    removeError(errorMsgKey) {
        let errorMsg = this.ERROR_MSG.get(errorMsgKey);
        const errorlist = this.errorlistEl.getElementsByTagName("li");
        for (let i = 0; i < errorlist.length; i++) {
            if (errorlist[i].innerHTML == errorMsg) {
                errorlist[i].remove();
            }
        }
    }

    clearErros() {
        this.errorlistEl.innerHTML = "";
    }
}