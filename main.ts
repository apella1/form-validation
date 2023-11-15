const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = document.querySelector("small")!;
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "The email you have entered is not valid");
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });
  return isRequired;
}

function checkLength(input, max, min) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters!`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at most ${max} characters!`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Passwords do not match");
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (checkRequired([firstName, lastName, email, password, password2])) {
    checkLength(firstName, 3, 15);
    checkLength(lastName, 3, 15);
    checkLength(password, 8, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
  }
});
