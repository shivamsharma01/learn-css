let password = document.getElementById("pswd");
let toggleBtn = document.getElementById("toggle-btn");
let lower = document.getElementById("lower");
let upper = document.getElementById("upper");
let number = document.getElementById("number");
let special = document.getElementById("special");
let length = document.getElementById("length");

toggleBtn.onclick = function () {
  if (password.type === "password") {
    password.setAttribute("type", "text");
    toggleBtn.classList.add("hide");
  } else {
    password.setAttribute("type", "password");
    toggleBtn.classList.remove("hide");
  }
};

function perform(validator, data, elem) {
    if (validator.test(data)) {
        elem.classList.add('success');
    } else {
        elem.classList.remove('success');
    }
}
function checkPassword() {
  const data = password.value;
  const lowerValidation = new RegExp('(?=.*[a-z])');
  const upperValidation = new RegExp('(?=.*[A-Z])');
  const digitValidation = new RegExp('(?=.*[0-9])');
  const specialValidation = new RegExp('(?=.*[!@#\$%\^&\*])');
  const lengthValidation = new RegExp('(?=.{8,})')
  perform(lowerValidation, data, lower);
  perform(upperValidation, data, upper);
  perform(digitValidation, data, number);
  perform(specialValidation, data, special);
  perform(lengthValidation, data, length);
}
