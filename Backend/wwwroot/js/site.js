// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

function validateRequiredField(inputElement, errorElement) {
  const isValid = inputElement.value.trim() !== "";

  if (isValid == false) {
    inputElement.classList.add("invalid");
    inputElement.classList.remove("valid");
    errorElement.innerText = "Required";
  }
  else {
    inputElement.classList.add("valid");
    inputElement.classList.remove("invalid");
    errorElement.innerText = "";
  }
  
  return isValid;
}
