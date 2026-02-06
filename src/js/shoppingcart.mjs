import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  const outputEl = document.querySelector(".product-list");

  // Render the cart items
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

  // Update the cart count in the header
  updateCartCount(cartItems);
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
<p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
<p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// --- New function to update the header cart count ---
function updateCartCount(cartItems) {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartCountEl.textContent = totalItems;
}
