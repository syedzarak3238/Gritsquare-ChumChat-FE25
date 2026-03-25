const form = document.getElementById("form-post");
const input = document.querySelector(".message-area");
const btn = document.querySelector(".chat-send-button");

const COOLDOWN_TIME = 3;

let cooldown = false;
let timeLeft = 0;
let interval = null;

// ----------------------
// 💬 FORM SUBMIT
// ----------------------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cooldown) return;

  const text = input.value.trim();
  if (!text) return;

  // create message
  const message = document.createElement("p");
  message.textContent = text;
  document.querySelector(".content").appendChild(message);

  input.value = "";

  // 🌍 re-translate
  setTimeout(() => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.dispatchEvent(new Event("change"));
    }
  }, 300);

  startCooldown();
});

// ----------------------
// ⏳ COOLDOWN
// ----------------------
function startCooldown() {
  cooldown = true;
  timeLeft = COOLDOWN_TIME;

  btn.disabled = true;
  btn.textContent = `Wait ${timeLeft}s`;

  interval = setInterval(() => {
    timeLeft--;

    if (timeLeft > 0) {
      btn.textContent = `Wait ${timeLeft}s`;
    } else {
      clearInterval(interval);

      cooldown = false;
      btn.disabled = false;
      btn.textContent = "Send";
    }
  }, 1000);
}
