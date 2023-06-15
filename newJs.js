const submitButton = document.getElementById("submitButton");
const inputName = document.getElementById("name");
const button = document.getElementById("button");

submitButton.addEventListener("click", () => {
  button.innerText = `Welcome ${inputName.value}, Click To Play!`;
});

button.addEventListener("click", () => {
  window.location.href = "gamePage.html";
});
