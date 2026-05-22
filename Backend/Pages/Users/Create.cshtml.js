
const form = document.querySelector("#CreateUserForm");

const firstName = form.querySelector("#FirstName");
const username = form.querySelector("#Username");
const email = form.querySelector("#Email");

const firstNameError = form.querySelector("#FirstNameError");
const emailError = form.querySelector("#EmailError");
const usernameError = form.querySelector("#UsernameError");

async function validateUsername() {
  const value = username.value.trim();

  if (value === "") {
    usernameError.innerText = "Required";
    return false;
  }

  const response = await fetch(`/Users/Create?handler=CheckUsername&username=${encodeURIComponent(value)}`);
  const result = await response.json();

  if (result.isAvailable == false) {
    usernameError.innerText = "Username not available";
    return false;
  }

  usernameError.innerText = "";

  return true;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let isValid = true;

  isValid = validateRequiredField(firstName, firstNameError) && isValid;
  isValid = validateRequiredField(email, emailError) && isValid;
  isValid = validateRequiredField(username, usernameError) && isValid;

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
  validateRequiredField(email, emailError);
});
