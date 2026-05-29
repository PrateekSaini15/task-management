// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

function setFieldState(fieldElement, errorElement, errorMessage) {
  if (errorMessage !== null) {
    fieldElement.classList.add("invalid");
    fieldElement.classList.remove("valid");
    errorElement.innerText = errorMessage;
  }
  else {
    fieldElement.classList.add("valid");
    fieldElement.classList.remove("invalid");
    errorElement.innerText = "";
  }
}

function debounce(callback, delay) {
  let timeoutId = null;

  return function (...args) {
    clearTimeout(timeoutId);

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        Promise.resolve(callback(...args))
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  }
}
