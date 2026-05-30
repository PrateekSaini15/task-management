
const form = document.querySelector("#CreateUserForm");

function field(name, options = {}) {
  return {
    input: form.querySelector(`#${name}`),
    error: form.querySelector(`#${name}Error`),
    validate: options.validate,
    remote: options.remote ?? null,
    controller: null,
    requestId: 0
  };
}

function validateFirstName(value) {
  if (value === "") {
    return "Required";
  }

  if (value.length > 100) {
    return "Max length is 100 characters only";
  }

  return null;
}

function validateLastName(value) {
  if (value === "") {
    return null;
  }

  if (value.length > 100) {
    return "Max length  is 100 characters only";
  }

  return null;
}

function validateUsername(value) {
  if (value === "") {
    return "Required";
  }

  if (value.length > 100) {
    return "Max length is 100 characters only";
  }

  return null;
}

async function checkUsername(value, signal) {
  const response = await fetch(`/Users/Create?handler=IsUsernameAvailable&username=${encodeURIComponent(value)}`, { signal });
  const result = await response.json();

  return result.isAvailable == true ? null : "Username not available";
}

function validateEmail(value) {
  if (value === "") {
    return "Required";
  }

  if (value.includes("@") == false || value.includes(".") == false) {
    return "Incorrect email format"
  }

  if (value.length > 100) {
    return "Max length is 100 characters only";
  }

  return null;
}

async function checkEmail(value, signal) {
  const response = await fetch(`/Users/Create?handler=IsEmailAvailable&email=${encodeURIComponent(value)}`, { signal });
  const result = await response.json();

  return result.isAvailable == true ? null : "Email not available";
}

function validatePassword(value) {
  if (value === "") {
    return "Required";
  }

  if (value.length > 100) {
    return "Max length is 100 characters only";
  }

  return null;
}

function validateConfirmPassword(confirmPasswordValue, passwordValue) {
  if (confirmPasswordValue === "") {
    return "Required"
  }

  if (confirmPasswordValue !== passwordValue) {
    return "Password is not matching"
  }

  return null;
}

const password = field("Password", {
  validate: validatePassword
});

const fields = [
  field("FirstName", {
    validate: validateFirstName
  }),

  field("LastName", {
    validate: validateLastName
  }),

  field("Email", {
    validate: validateEmail,
    remote: debounce(checkEmail, 500)
  }),
  
  field("Username", {
    validate: validateUsername,
    remote: debounce(checkUsername, 500)
  }),

  password,

  field("ConfirmPassword", {
    validate: (value) => {
      return validateConfirmPassword(value, password.input.value.trim());
    }
  }),
];

async function validateField(field) {
  const value = field.input.value.trim();

  const error = field.validate(value);

  setFieldState(field.input, field.error, error);

  if (error !== null) {
    return false;
  }

  if (field.remote == null) {
    return true;
  }

  field.controller?.abort();
  field.controller = new AbortController();
  const requestId = ++field.requestId;

  try {

    const error = await field.remote(value, field.controller.signal);

    if (requestId !== field.requestId) {
      return false;
    }

    setFieldState(field.input, field.error, error);

    return error === null;
  }
  catch(error) {
    if (error.name === "AbortError") {
      return;
    }
    console.error(error);
    setFieldState(field.input, field.error, "Validation request failed");
  }
}

for(const field of fields) {
  field.input.addEventListener("input", () => {
    validateField(field);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let isValid = true;

  for(const field of fields) {
    const valid = await validateField(field);
    
    if (valid == false) {
      isValid = false;
    }
  }

  if (isValid == false) {
    return;
  }

  event.submit();
});

