import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, calculateCartTotal } from "./utils.mjs";

loadHeaderFooter();

async function renderCartContents() {
  const cartItems = await getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <div id="empty-cart">
        <p>Your cart is empty.</p>
        <br>
        <img src="/images/EmptyCart.png" alt="Empty Cart" id="empty-cart-image"/>
      </div>`;
    updateCartTotal();
    return;
  }
  const validItems = cartItems.filter(item => item.Id)
  const htmlItems = validItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  updateCartTotal();
}


function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <span class="remove-item" data-id="${item.Id}">✕</span>

      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">${item.Quantity ? `qty: ${item.Quantity}` : ""}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

renderCartContents();


export function getCartItems() {
  return JSON.parse(localStorage.getItem("so-cart")) || [];
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

function removeFromCart(id) {
  let cartItems = getCartItems();

  cartItems = cartItems.filter(item => item.Id !== id);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
  updateCartTotal();
}
document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const id = e.target.dataset.id;
    removeFromCart(id);
  }
});
