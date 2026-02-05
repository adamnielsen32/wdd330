import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

async function renderCartContents() {
  const cartItems = await getLocalStorage("so-cart") || [];
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<div id='empty-cart'><p>Your cart is empty.</p> <br> <img src='/images/EmptyCart.png' alt='Empty Cart' id='empty-cart-image'/></div>";
    return;
  }
  const validItems = cartItems.filter(item => item.Id)
  const htmlItems = validItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();


function getCartItems() {
  return JSON.parse(localStorage.getItem("so-cart")) || [];
}

function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => {
    return total + Number(item.FinalPrice);
  }, 0);
}

function updateCartTotal() {
  const cartItems = getCartItems();
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  // Empty cart → hide footer
  if (cartItems.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  // Cart has items → show footer
  cartFooter.classList.remove("hide");

  const total = calculateCartTotal(cartItems);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}


document.addEventListener("DOMContentLoaded", () => {
  // Your existing cart rendering logic here
  updateCartTotal();
});
