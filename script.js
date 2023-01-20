document.querySelector('.img__btn').addEventListener('click', function () {
  document.querySelector('.cont').classList.toggle('s--signup');
});

const loginForm = new LoginForm(document.querySelector('#login-email-inp'), document.querySelector('#login-pw-inp'), document.querySelector('#login-submit-btn'), new ErrorList(document.querySelector('#login-errorlist')), new CaptchaHandler(document.querySelector("#login-captcha-inp"), document.querySelector("#login-captcha-reload-btn"), document.querySelector("#login-chaptcha-image")));
const registerForm = new RegisterForm(document.querySelector('#register-name-inp'), document.querySelector('#register-email-inp'), document.querySelector('#register-pw-inp'), document.querySelector('#register-submit-btn'), new ErrorList(document.querySelector('#register-errorlist')), new CaptchaHandler(document.querySelector("#register-captcha-inp"), document.querySelector("#register-captcha-reload-btn"), document.querySelector("#register-chaptcha-image")));
