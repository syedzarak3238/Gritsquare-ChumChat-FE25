window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("termsPopup");
  const checkbox = document.getElementById("agreeCheckbox");
  const button = document.getElementById("acceptBtn");
  const mainContent = document.getElementById("mainContent");

  const accepted = localStorage.getItem("termsAccepted");

  // Show popup if not accepted
  if (!accepted) {
    popup.style.display = "flex";
    mainContent.classList.add("blur");
  }

  // Enable button when checked
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      button.disabled = false;
      button.classList.add("active");
    } else {
      button.disabled = true;
      button.classList.remove("active");
    }
  });

  // Accept click
  button.addEventListener("click", () => {
    localStorage.setItem("termsAccepted", "true");
    popup.style.display = "none";
    mainContent.classList.remove("blur");
  });
});

function showTermsPopup() {
  const popup = document.getElementById("termsPopup");
  const mainContent = document.getElementById("mainContent");

  popup.style.display = "flex";
  mainContent.classList.add("blur");
}

const checkbox = document.getElementById("agreeCheckbox");
const button = document.getElementById("acceptBtn");
const popup = document.getElementById("termsPopup");
const mainContent = document.getElementById("mainContent");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    button.disabled = false;
    button.classList.add("active");
  } else {
    button.disabled = true;
    button.classList.remove("active");
  }
});

button.addEventListener("click", () => {
  popup.style.display = "none";
  mainContent.classList.remove("blur");
});


const accepted = localStorage.getItem("termsAccepted");

if (!accepted) {
  showTermsPopup();
}
localStorage.setItem("termsAccepted", "true");
