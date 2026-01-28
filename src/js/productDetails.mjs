import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
let product = {};
export default async function productDetails(productId) {
    product = await findProductById(productId);
    renderProductDetails(product);
    document.getElementById("addToCart").addEventListener("click", () => addProductToCart(product));
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  console.log("Added cartItems:", cartItems);
  setLocalStorage("so-cart", cartItems);
}

function renderProductDetails(product) {
    document.getElementById("productName").textContent = product.Name;
    document.getElementById("productNameWithoutBrand").textContent = product.NameWithoutBrand;
    document.getElementById("productImage").src = product.Image;
    document.getElementById("productImage").alt = product.Name;
    document.getElementById("productPrice").textContent = `$${product.ListPrice.toFixed(2)}`;
    document.getElementById("productColor").textContent = `Color: ${product.Colors[0].ColorName}`;
    document.getElementById("productDescription").innerHTML = product.DescriptionHtmlSimple;
}