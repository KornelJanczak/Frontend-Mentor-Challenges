"use strict";
fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    // Wyświetlanie kolumn
    const displayChart = function (product) {
      const chartBox = document.querySelector(".chart-box");
      chartBox.innerHTML = "";
      product.forEach(function (prod, i) {
        const index = i + 1;
        const currentDay = new Date().getDay();
        const bgClass = index === currentDay ? "today" : "other-day";
        const html = `  <div class="chart">
        <div class="chart-data">$${prod.amount}</div>
            <div class="chart-column ${bgClass}" style="height:${
          prod.amount * 2
        }px"></div>
            <span class="chart-day">${prod.day}</span>
        </div>`;
        chartBox.insertAdjacentHTML("beforeend", html);
      });
    };
    displayChart(products);
  });
