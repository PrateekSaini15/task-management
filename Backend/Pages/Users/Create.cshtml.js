
const form = document.querySelector("#CreateUserForm");

const firstName = form.querySelector("#FirstName");
const username = form.querySelector("#Username");
const email = form.querySelector("#Email");
const password = form.querySelector("#Password");
const confirmPassword = form.querySelector("#ConfirmPassword");

const firstNameError = form.querySelector("#FirstNameError");
const emailError = form.querySelector("#EmailError");
const usernameError = form.querySelector("#UsernameError");
const passwordError = form.querySelector("#PasswordError");
const confirmPasswordError = form.querySelector("#ConfirmPasswordError");

async function validateUsername() {
  const value = username.value.trim();

  if (value === "") {
    return false;
  }

  const response = await fetch(`/Users/Create?handler=IsUsernameAvailable&username=${encodeURIComponent(value)}`);
  const result = await response.json();

  if (result.isAvailable == false) {
    const errorMessage = "Username not available";
    username.setCustomValidity(errorMessage);
    usernameError.innerText = errorMessage;
    return false;
  }

  username.setCustomValidity("");
  usernameError.innerText = "";

  return true;
}

function validateEmail() {

  const value = email.value.trim();

  if (value === "") {
    const errorMessage = "Required";
    email.setCustomValidity(errorMessage)
    emailError.innerText = errorMessage;
    return false;
  }

  if (value.includes("@") == false || value.includes(".") == false) {
    const errorMessage = "Incorrect email format";
    email.setCustomValidity(errorMessage);
    emailError.innerText = errorMessage;
    return false;
  }

  email.setCustomValidity("");
  emailError.innerText = "";

  return true;
}

async function validateEmailAvailable() {

  const value = email.value.trim();

  if (value === "") {
    return false;
  }

  if (value.includes("@") == false || value.includes(".") == false) {
    return false;
  }

  const response = await fetch(`/Users/Create?handler=IsEmailAvailable&email=${encodeURIComponent(value)}`);

  const result = await response.json();

  if (result.isAvailable == false) {
    const errorMessage = "Email is not available";
    email.setCustomValidity(errorMessage);
    emailError.innerText = errorMessage;
    return false;
  }

  email.setCustomValidity("");
  emailError.innerText = "";

  return true;
}

function validateConfirmPassword() {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (confirmPasswordValue === "") {
    const errorMessage = "Required";
    confirmPassword.setCustomValidity(errorMessage);
    confirmPasswordError.innerText = errorMessage;
    return false;
  }

  if (confirmPasswordValue !== passwordValue) {
    const errorMessage = "Password is not matching";
    confirmPassword.setCustomValidity(errorMessage);
    confirmPasswordError.innerText = errorMessage;
    return false;
  }

  confirmPassword.setCustomValidity("");
  confirmPasswordError.innerText = "";

  return true;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let isValid = true;

  isValid = validateRequiredField(firstName, firstNameError) && isValid;
  isValid = validateRequiredField(email, emailError) && isValid;
  isValid = validateRequiredField(username, usernameError) && isValid;
  isValid = await validateUsername() && isValid;
  isValid = validateRequiredField(password, passwordError) && isValid;
  isValid = validateConfirmPassword() && isValid;

  if (isValid == false) {
    return;
  }

  form.submit();
});

firstName.addEventListener("input", () => {
  validateRequiredField(firstName, firstNameError);
});
username.addEventListener("input", () => {
  validateRequiredField(username, usernameError);
});
username.addEventListener("blur", () => {
  validateUsername();
});
email.addEventListener("input", () => {
  validateEmail();
});
email.addEventListener("blur", () => {
  validateEmailAvailable();
});
password.addEventListener("input", () => {
  validateRequiredField(password, passwordError);
});
confirmPassword.addEventListener("input", () => {
  validateConfirmPassword();
});
