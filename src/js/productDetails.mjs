import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // Guard: missing product id
  if (!productId) {
    renderProductNotFound();
    return;
  }

  product = await findProductById(productId);

  // Guard: product not found
  if (!product) {
    renderProductNotFound();
    return;
  }

  // Normal behavior
  renderProductDetails(product);

  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () =>
      addProductToCart(product)
    );
  }
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  console.log("Added cartItems:", cartItems);
  setLocalStorage("so-cart", cartItems);

  let cart = document.querySelector(".cart");
  if (cart) {
    cart.classList.add("cart--actived");
    cart.classList.add("animate-bounce");
    cart.addEventListener(
      "animationend",
      () => {
        cart.classList.remove("animate-bounce");
      },
      { once: true }
    );
  }
}

function renderProductDetails(product) {
  document.getElementById("productName").textContent = product.Name;
  document.getElementById("productNameWithoutBrand").textContent =
    product.NameWithoutBrand;

  const image = document.getElementById("productImage");
  image.src = product.Image;
  image.alt = product.Name;

  const priceElement = document.getElementById("productPrice");

  // ✅ Discount logic (UI only)
  if (
    product.FinalPrice &&
    product.FinalPrice < product.ListPrice
  ) {
    priceElement.innerHTML = `
      <span style="text-decoration: line-through; color: #777;">
        $${product.ListPrice.toFixed(2)}
      </span>
      <span style="color: darkred; font-weight: bold; margin-left: 0.5rem;">
        $${product.FinalPrice.toFixed(2)}
      </span>
    `;
  } else {
    priceElement.textContent = `$${product.ListPrice.toFixed(2)}`;
  }

  document.getElementById(
    "productColor"
  ).textContent = `Color: ${product.Colors[0].ColorName}`;

  document.getElementById("productDescription").innerHTML =
    product.DescriptionHtmlSimple;
}

function renderProductNotFound() {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="product-not-found">
      <h2>Product Not Found</h2>
      <p>Sorry, the product you are trying to view does not exist.</p>
      <a href="/index.html">Return to Home</a>
    </section>
  `;
}
