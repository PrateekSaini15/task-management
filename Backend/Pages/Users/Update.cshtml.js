const form = document.querySelector("#UpdateUserForm");

function field(name, options = {}) {
  return {
    input: form.querySelector(`#${name}`),
    error: form.querySelector(`#${name}Error`),
    validate: options.validate ?? null,
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
    return "Max length is 100 characters only";
  }

  return null;
}

const fields = [
  field("FirstName", {
    validate: validateFirstName
  }),

  field("LastName", {
    validate: validateLastName
  })
];

function validateField(field) {
  const value = field.input.value.trim();

  const error = field.validate(value);

  setFieldState(field.input, field.error, error);

  if (error != null) {
    return false;
  }

  if (field.remote == null) {
    return true;
  }
}

for (const field of fields) {
  field.input.addEventListener("input", () => {
    validateField(field);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isValid = true;

  for(const field of fields) {
    const valid = validateField(field);

    if (valid == false) {
      isValid = false;
    }
  }

  if (isValid == false) {
    return;
  }

  event.submit();
});
