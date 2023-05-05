const msgMeter = document.querySelector(".msg-meter");
const readBtn = document.querySelector(".as-read");
const msg = document.querySelectorAll(".message");
console.log(msgMeter.textContent);
console.log(msg);
const unReadLength = document
  .querySelectorAll(".un-read-message")
  .length.toString();
msgMeter.textContent = unReadLength;
console.log(unReadLength);

// Przycisk usuwający status nieprzeczytane

readBtn.addEventListener("click", function () {
  for (let i = 0; i < msg.length; i++) {
    const unReadMsg = msg[i].classList.contains("un-read-message");
    const ReadMsg = msg[i].classList.contains("as-read-message");
    console.log(unReadMsg);
    // console.log(ReadMsg);
    if (unReadMsg) {
      msg[i].classList.toggle("as-read-message");
      msg[i].classList.toggle("un-read-message");
    }
    unReadMeter();
  }
});

// Przycisk dodający status przeczytania przy kliknięciu

for (let i = 0; i < msg.length; i++) {
  msg[i].addEventListener("click", function () {
    msg[i].classList.toggle("as-read-message");
    msg[i].classList.toggle("un-read-message");
    unReadMeter();
  });
}

// Funkcja licząca nieprzeczytane wiadomości

function unReadMeter() {
  const unReadLength = document
    .querySelectorAll(".un-read-message")
    .length.toString();
  msgMeter.textContent = unReadLength;
}

// Funkcją przełączająca klasy


