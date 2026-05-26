
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
    username.classList.add("invalid");
    username.classList.remove("valid");
    usernameError.innerText = "Username not available"
    return false;
  }

  username.classList.add("valid");
  username.classList.remove("invalid");
  usernameError.innerText = "";

  return true;
}

function validateEmail() {

  const value = email.value.trim();

  if (value === "") {
    email.classList.add("invalid");
    email.classList.remove("valid");
    emailError.innerText = "Required"
    return false;
  }

  if (value.includes("@") == false || value.includes(".") == false) {
    email.classList.add("invalid");
    email.classList.remove("valid");
    emailError.innerText = "Incorrect email format"
    return false;
  }

  email.classList.add("valid");
  email.classList.remove("invalid");
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
    email.classList.add("invalid");
    email.classList.remove("valid");
    emailError.innerText = "Email is not available"
    return false;
  }

  email.classList.add("valid");
  email.classList.remove("invalid");
  emailError.innerText = "";

  return true;
}

function validateConfirmPassword() {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (confirmPasswordValue === "") {
    confirmPassword.classList.add("valid");
    confirmPassword.classList.remove("invalid");
    confirmPasswordError.innerText = "Required"
    return false;
  }

  if (confirmPasswordValue !== passwordValue) {
    confirmPassword.classList.add("invalid");
    confirmPassword.classList.remove("valid");
    confirmPasswordError.innerText = "Password is not matching"
    return false;
  }

  confirmPassword.classList.add("valid");
  confirmPassword.classList.remove("invalid");
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
