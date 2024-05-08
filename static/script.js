document.addEventListener("DOMContentLoaded", function() {
  // Get the form elements
  var uploadForm = document.getElementById("upload-form");
  var urlForm = document.getElementById("url-form");

  // Add event listener for form submission
  uploadForm.addEventListener("submit", function(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get form data
    var formData = new FormData(uploadForm);

    // Send AJAX request
    fetch("/predict", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("response-message-file").innerHTML = data;
      document.getElementById("response-message-file").style.display = "block";
    })
    .catch(error => {
      // Handle error
      console.error("Error occurred:", error);
    });
  });

  urlForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    var url = document.getElementById("text_content").value;
    console.log(url);
    console.log(document.getElementById("text_content"));
    var formData1 = new FormData(urlForm);
    // Send AJAX request
    fetch("/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: formData1
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then(data => {
      // Handle successful response
      document.getElementById("response-message-url").innerHTML = data;
      document.getElementById("response-message-url").style.display = "block";
    })
    .catch(error => {
      // Handle error
      console.error("Error occurred:", error);
    });
  });
});