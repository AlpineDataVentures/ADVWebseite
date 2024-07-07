// utils/contactFormScript.ts

const form = document.getElementById("contact") as HTMLFormElement | null;
const xhr = new XMLHttpRequest();

const handleFormSubmission = (event: SubmitEvent) => {
  // prevent page from reloading
  event.preventDefault();

  const target = event.target as HTMLFormElement;
  const data = target.elements as HTMLFormControlsCollection;

  // put into JSON object
  const formData = {
    firstname: (data.namedItem("firstname") as HTMLInputElement).value,
    lastname: (data.namedItem("lastname") as HTMLInputElement).value,
    email: (data.namedItem("email") as HTMLInputElement).value,
    message: (data.namedItem("message") as HTMLTextAreaElement).value,
    phone: (data.namedItem("phone") as HTMLTextAreaElement).value,
    reason: (data.namedItem("reason") as HTMLTextAreaElement).value,
    website: (data.namedItem("website") as HTMLTextAreaElement).value,
  };

  // Set POST request method to our netlify function
  xhr.open("POST", "/.netlify/functions/contact");

  // Set the request headers
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  // Send the data as JSON to our netlify function
  xhr.send(JSON.stringify(formData));

  // Handle the response
  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);

    if (xhr.status === 200) {
      // The request was successful
      // show feedback message
      document.getElementById("feedback")?.classList.remove("hidden");
      target.reset();
    } else {
      // The request failed
      document.getElementById("fail_feedback")?.classList.remove("hidden");
    }
  };
};

// add the submission event listener
form?.addEventListener("submit", handleFormSubmission, true);
