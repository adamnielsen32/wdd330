import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import renderAlerts from "./alerts.mjs";

// Load shared header and footer
loadHeaderFooter();

// Render alert messages at top of <main>
const main = document.querySelector("main");
renderAlerts().then((alerts) => {
  if (alerts && main) {
    main.prepend(alerts);
  }
});

// Render top products list
const searchTerm = new URLSearchParams(window.location.search).get("search");
productList(".product-list", "tents", searchTerm);

// ===== Cart counter code =====

// Get cart items from localStorage
function getCartItems() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Update cart counter
function updateCartCounter() {
  const cartItems = getCartItems();
  const counter = document.getElementById("cart-count");
  if (!counter) return; // make sure element exists

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  counter.textContent = totalQuantity;

  // Hide if empty
  counter.style.display = totalQuantity === 0 ? "none" : "flex";
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCounter);

// Optional: expose function globally so cart.js can call it after adding/removing items
window.updateCartCounter = updateCartCounter;
