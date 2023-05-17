const addToCart = document.querySelector(".btn-add");
const cartBtn = document.querySelector(".cart-btn");
const productCart = document.querySelector(".product-cart");
const cartBox = document.querySelector(".product-box");
const product = document.querySelector(".product");
const amount = document.querySelector(".how-much-product");
const minusAmount = document.querySelector(".minus");
const plusAmount = document.querySelector(".plus");
const indicator = document.querySelector(".indicator");
const largeImg = document.getElementById("largeImg");
// Modal
const overlay = document.querySelector(".overlay");
const modalSlider = document.querySelector(".modal-slider");
const closeModalBtn = document.querySelector(".close-modal");
// Mobile Menu
const header = document.querySelector('header')
const mobileBtn = document.querySelector(".btn-mobile-nav");

let amountValue = Number(amount.textContent);
let itemValue = 0;

// Plus Amount
plusAmount.addEventListener("click", function (e) {
  amountValue++;
  amount.textContent = amountValue;
});

// Minus Amount
minusAmount.addEventListener("click", function (e) {
  if (amountValue > 0) {
    amountValue--;
    amount.textContent = amountValue;
  }
});

// Open Product Cart
cartBtn.addEventListener("click", function () {
  productCart.classList.toggle("hidden");
});

// Add button
addToCart.addEventListener("click", function () {
  console.log(amountValue);
  itemValue += amountValue;
  let productString;
  if (itemValue > 0) {
    product.innerHTML = "";
    indicator.classList.remove("hidden");
    indicator.textContent = itemValue.toString();
    productString = `
    <div class="product-content">
                  <img src="images/image-product-1.jpg" class="cart-img" />
                  <div class="product-text">
                    <span>Fall Limited Edition Sneakers</span>
                    <span>$125.00 x ${itemValue}
                      <strong class="text-strong">$${125 * itemValue}</strong>
                    </span>
                  </div>
                  <img src="images/icon-delete.svg" class="del-btn" />
                </div>
                <button class="checkout-btn">Checkout</button>
    `;
    product.insertAdjacentHTML("beforeend", productString);
  }
});

// Product Box Delete Button
product.addEventListener("click", function (e) {
  const element = e.target;
  if (element.classList.contains("del-btn")) {
    itemValue = 0;
    indicator.textContent = itemValue.toString();
    indicator.classList.add("hidden");
    product.innerHTML = "";
    product.innerHTML =
      '<span class="empty-product">Your cart is empty.</span>';
  }
});

// Open Modal slider
largeImg.addEventListener("click", function (e) {
  // console.log(e.target);
  if (e.target.getAttribute("src")) {
    console.log(e.target);
    overlay.classList.remove("hidden");
    modalSlider.classList.remove("hidden");
  }
});

//Hide Modal
const hideModal = function () {
  overlay.classList.add("hidden");
  modalSlider.classList.add("hidden");
};

overlay.addEventListener("click", hideModal);
closeModalBtn.addEventListener("click", hideModal);

// Mobile Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide-mobile");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };
  goToSlide(0);

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  // Event Handler
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
};
slider();


//Mobile Menu 
mobileBtn.addEventListener('click', function(){
 header.classList.toggle('nav-open')
 overlay.classList.toggle('hidden')
})