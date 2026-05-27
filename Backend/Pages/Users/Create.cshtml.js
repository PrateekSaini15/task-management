
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

function getFirstNameValidationError() {
  const value = firstName.value.trim();

  if (value === "") {
    return "Required";
  }

  return null;
}

firstName.addEventListener("input", () => {
  const error = getFirstNameValidationError();

  if (error !== null) {
    setFieldState(firstName, firstNameError, false, error);
    return;
  }

  setFieldState(firstName, firstNameError, true);
});

function getUsernameValidationError() {
  const value = username.value.trim();

  if (value === "") {
    return "Required";
  }

  return null;
}

async function getUsernameValidationErrorAsync() {
  const value = username.value.trim();

  const response = await fetch(`/Users/Create?handler=IsUsernameAvailable&username=${encodeURIComponent(value)}`);
  const result = await response.json();

  if (result.isAvailable == false) {
    return "Username not available"
  }

  return null;
}

const debounceUsernameValidationAsync = debounce(getUsernameValidationErrorAsync, 500);

username.addEventListener("input", async () => {
  const error = getUsernameValidationError();

  if (error !== null) {
    setFieldState(username, usernameError, false, error);
    return;
  }

  const errorAsync = await debounceUsernameValidationAsync();

  if (errorAsync !== null) {
    setFieldState(username, usernameError, false, errorAsync);
    return;
  }

  setFieldState(username, usernameError, true);
});

function getEmailValidationError() {

  const value = email.value.trim();

  if (value === "") {
    return "Required";
  }

  if (value.includes("@") == false || value.includes(".") == false) {
    return "Incorrect email format"
  }

  return null;
}

async function getEmailValidationErrorAsync() {

  const value = email.value.trim();

  const response = await fetch(`/Users/Create?handler=IsEmailAvailable&email=${encodeURIComponent(value)}`);

  const result = await response.json();

  if (result.isAvailable == false) {
    return "Email is not available"
  }

  return null;
}

const debounceEmailValidationAsync = debounce(getEmailValidationErrorAsync, 500); 

email.addEventListener("input", async () => {
  const error = getEmailValidationError();

  if (error !== null) {
    setFieldState(email, emailError, false, error);
    return;
  }

  const errorAsync = await debounceEmailValidationAsync();

  if (errorAsync !== null) {
    setFieldState(email, emailError, false, errorAsync);
    return;
  }

  setFieldState(email, emailError, true);

});

function getPasswordValidationError() {
  const value = password.value.trim();

  if (value === "") {
    return "Required";
  }

  return null;
}

password.addEventListener("input", () => {
  const error = getPasswordValidationError();

  if (error !== null) {
    setFieldState(password, passwordError, false, error);
    return;
  }

  setFieldState(password, passwordError, true);
});

function getConfirmPasswordValidationError() {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (confirmPasswordValue === "") {
    return "Required"
  }

  if (confirmPasswordValue !== passwordValue) {
    return "Password is not matching"
  }

  return null;
}

confirmPassword.addEventListener("input", () => {
  const error = getConfirmPasswordValidationError();

  if (error !== null) {
    setFieldState(confirmPassword, confirmPasswordError, false, error);
    return;
  }

  setFieldState(confirmPassword, confirmPasswordError, true);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let isValid = true;

  const firstNameErrorMessage = getFirstNameValidationError();

  if (firstNameErrorMessage !== null) {
    setFieldState(firstName, firstNameError, false, firstNameErrorMessage);
    isValid = false;
  }

  const emailErrorMessage = getEmailValidationError();

  if (emailErrorMessage !== null) {
    setFieldState(email, emailError, false, emailErrorMessage);
    isValid = false;
  }

  const usernameErrorMessage = getUsernameValidationError();

  if (usernameErrorMessage !== null) {
    setFieldState(username, usernameError, false, usernameErrorMessage);
    isValid = false;
  }

  const passwordErrorMessage = getPasswordValidationError();

  if (passwordErrorMessage !== null) {
    setFieldState(password, passwordError, false, passwordErrorMessage);
    isValid = false;
  }

  const confirmPasswordErrorMessage = getConfirmPasswordValidationError();

  if (confirmPasswordErrorMessage !== null) {
    setFieldState(confirmPassword, confirmPasswordError, false, confirmPasswordErrorMessage);
    isValid = false;
  }

  if (isValid == false) {
    return;
  }

  form.submit();
});
