const form = document.querySelector("#CreateProjectForm");
const addMember = document.querySelector("#AddMember");
const memberContainer = document.querySelector("#MemberContainer");
const template = document.querySelector("#MemberTemplate");

function validationError(controlElement) {
  const value = controlElement.value.trim();

  if (controlElement.hasAttribute("required") == true && value === "") {
    return "Required";
  }

  if (value === "") {
    return null;
  }

  return null;
}

function localValidation(controlElement, errorElement) {
  const error = validationError(controlElement);
  setFieldState(controlElement, errorElement, error);

  return error === null;
}

addMember.addEventListener("click", (event) => {
  const clone = document.importNode(template.content, true);
  const tr = clone.querySelector("tr");
  memberContainer.append(tr);
});

form.addEventListener("input", (event) => {
  const errorElement = event.target.closest(".form-group").querySelector(":scope > .invalid-feedback");
  localValidation(event.target, errorElement);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const controls = form.querySelectorAll("input,select");
  let isValid = true;

  for (const control of controls) {
    const errorElement = control.closest(".form-group")?.querySelector(":scope > .invalid-feedback");

    if (localValidation(control, errorElement) === false) {
      isValid = false;
    }
  }

  if (isValid == false) {
    return;
  }

  const requestBody = {
    Name: form.querySelector("[name='Name']").value,
    Members: []
  };

  memberContainer.querySelectorAll("tr").forEach(row => {
    requestBody.Members.push({
      MemberId: Number(row.querySelector("[name='MemberId']").value),
      RoleId: Number(row.querySelector("[name='RoleId']").value)
    });
  });

  const response = await fetch("?handler=Save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "RequestVerificationToken":
      document.querySelector(
        'input[name="__RequestVerificationToken"]'
      ).value
    },
    body: JSON.stringify(requestBody)
  });

  const result = await response.json();

  if (result.isSuccess === true ) {
    window.location.assign(`${window.location.origin}/projects`);
    return;
  }

  console.error(result.errorMessage);
});
