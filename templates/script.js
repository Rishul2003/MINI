function validateForm() {
  var fileInput = document.getElementById("file-upload");
  var errorMessage = document.getElementById("file-error-msg");
  var fileName = fileInput.value;
  var allowedExtensions = /(\.exe)$/i;

  if (fileName === "") {
    errorMessage.innerHTML = "Please choose a file.";
    errorMessage.style.display = "block";
    return false;
  } else if (!allowedExtensions.exec(fileName)) {
    errorMessage.innerHTML = "Please choose an .exe file.";
    errorMessage.style.display = "block";
    return false;
  } else {
    errorMessage.style.display = "none";
    return true;
  }
}

window.onload = function () {
  document.getElementById("upload-form").onsubmit = function (e) {
    e.preventDefault();
    if (validateForm()) {
      var formData = new FormData(this);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/predict", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var responseMessage = document.getElementById("response-message");
            responseMessage.innerHTML = xhr.responseText;
            responseMessage.style.display = "block";
          } else {
            // Handle error if needed
            console.error("Request failed:", xhr.status);
          }
        }
      };
      xhr.send(formData);
    }
  };
};
