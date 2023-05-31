"use strict";

const form = document.querySelector(".form");
const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".btn-search");
const ipAddressEL = document.querySelector(".ip-address");
const locationsEL = document.querySelector(".location");
const timezoneEL = document.querySelector(".timezone");
const ispEL = document.querySelector(".isp");
let mapEL;
let apiKey = `at_hF7AYIQT9GSZeAtvGkGeIEPGF2dh3`
let API = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;
let coords;

// Render Data to Box
const dropData = function () {
  fetch(`${API}`)
    .then((response) => response.json())
    .then((json) => {
      const { lat } = json.location;
      const { lng } = json.location;
      coords = [lat, lng];
      const { country, region, timezone } = json.location;
      const isp = json.isp.split(" ").slice(0, 3).join(" ");
      // Show Data
      ipAddressEL.textContent = json.ip;
      locationsEL.textContent = `${region}, ${country}`;
      timezoneEL.textContent = `UTC ${timezone}`;
      ispEL.textContent = isp;
      renderMap(coords)
    });
};
dropData();


// Render Map
const renderMap = function (coords) {
  mapEL = L.map("map").setView(coords, 15);
  const svgIcon = L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
    <path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153
    32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 
    6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 
    14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 
    33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"
    />
    </svg>`,
    className: "",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapEL);
    
    L.marker(coords, { icon: svgIcon }).addTo(mapEL);
  };
  
  // Event Handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const convertStr = input.value.replaceAll(".", "");
    if (/^[a-zA-Z]+$/.test(convertStr) === false) {
      console.log("ip");
      API = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}
      &ipAddress=${input.value}`;
    } else {
      console.log(`domains`);
      API = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}
      &domain=${input.value}`;
    }
    input.value = "";
    mapEL.remove()
    dropData();
  });
  
