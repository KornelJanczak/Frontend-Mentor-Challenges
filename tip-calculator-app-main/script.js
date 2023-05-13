const bill = document.querySelector(".bill-input");
const people = document.querySelector(".people-input");
const custom = document.querySelector(".custom-button");
const tipButton = document.querySelectorAll(".tip-button");
const btnBox = document.querySelector(".tip-button-box");
const showTip = document.getElementById("tip-result");
const showTotal = document.getElementById("total-result");
const reset = document.querySelector(".reset-button");
const billError = document.querySelector(".bill-error");
const peopleError = document.querySelector(".people-error");
// Buttons
const tip5 = document.getElementById("tip5");
const tip10 = document.getElementById("tip10");
const tip15 = document.getElementById("tip15");
const tip25 = document.getElementById("tip25");
const tip50 = document.getElementById("tip50");

//  Problemy
// 1.Funkcja obliczająca kwote napiwku
//  bill + tip - bill/people = tip amount

// 2.Funckja obliczająca kowte całkowitą
//  bill + tip / people = total
// - Wykrycie wartości wpisanych w inputy
// - Dodać funkcję konwertującą textContent wszystkich przycisków w liczbę
//   albo nadać każdemu oddzielne id i wartość
// - Schować gdzieś te danę i wykonać działanie
// - wynik działania wyświetlić w showTotal.textContent jako string

// 3.Funkcja przycisku resetującego wszystkie wartości

// Wykrycie liczby wpisanej w input
// console.log(Number(bill.value));
// console.log(Number(people.value));
// bill.addEventListener("input", () =>
//   console.log(Number(document.querySelector(".bill-input").value))
// );

custom.addEventListener("input", () =>
  console.log(Number(document.querySelector(".custom-button").value))
);

let tip = 0;
let total = 0;
let fromPerson = 0;
let tipAmount = 0;

// Funkcje przełączająca klase przy zaznaczeniu
tipButton.forEach(function (button) {
  button.addEventListener("click", function () {
    // button.classList.toggle("button-selected");
    let billNum = Number(bill.value);
    let peopleNum = Number(people.value);

    // Counter tip and total
    const tipProcent = function (procent, amount) {
      if (button === procent) {
        // Total from Person
        tip = amount;
        total = billNum + billNum * tip;
        fromPerson = total / peopleNum;
        showTotal.textContent = `$${fromPerson.toFixed(2)}`;

        // Tip from person
        tipAmount = (total - billNum) / peopleNum;
        showTip.textContent = `$${tipAmount.toFixed(2)}`;
      }
    };

    tipProcent(tip5, 0.05);
    tipProcent(tip10, 0.1);
    tipProcent(tip15, 0.15);
    tipProcent(tip25, 0.25);
    tipProcent(tip50, 0.5);

    // Error Log
    const errorLog = function (input, element) {
      if (input.value === "") {
        showTotal.textContent = `$0.00`;
        showTip.textContent = `$0.00`;
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    };

    errorLog(bill, billError);
    errorLog(people, peopleError);
  });
});

// Custom Input
document.addEventListener("keydown", function (event) {
  console.log(event.key);
  if (event.key === "Enter") {
    let billNum = Number(bill.value);
    let peopleNum = Number(people.value);
    tip = Number(custom.value) / 100;
    total = billNum + billNum * tip;
    fromPerson = total / peopleNum;
    showTotal.textContent = `$${fromPerson.toFixed(2)}`;

    // Tip from person
    tipAmount = (total - billNum) / peopleNum;
    showTip.textContent = `$${tipAmount.toFixed(2)}`;
  }
  if (custom.value === "" || bill.value === "" || people.value === "") {
    showTotal.textContent = `$0.00`;
    showTip.textContent = `$0.00`;
  }

  // Custom Key error Log
  const keyError = function (input, indexError) {
    if (input.value === "" && event.key === "Enter") {
      indexError.style.display = "block";
    } else {
      indexError.style.display = "none";
    }
  };

  keyError(bill, billError);
  keyError(people, peopleError);
});

// Reset Button
reset.addEventListener("click", function () {
  tip = 0;
  total = 0;
  fromPerson = 0;
  tipAmount = 0;
  showTotal.textContent = `$0.00`;
  showTip.textContent = `$0.00`;
  bill.value = ``;
  people.value = ``;
  tipButton.forEach(function (button) {
    button.classList.remove("button-selected");
  });
});

// Toogle Active Button class
btnBox.addEventListener("click", (e) => {
  const clicked = e.target.closest(".tip-button");
  console.log(clicked);
  if (!clicked) return;
  tipButton.forEach((b) => b.classList.remove("button-selected"));
  clicked.classList.add("button-selected");
});
