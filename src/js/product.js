import { getParam } from "./utils.mjs";
import { getProductByCategory } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParam("product");

init();

async function init() {
  const product = await productDetails(productId);
  await renderBreadcrumb(product);
}

async function renderBreadcrumb(product) {
  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb || !product) return;

  // Find which category this product belongs to
  const categories = ["tents", "sleeping-bags", "backpacks"];
  let category = "";
  
  for (const cat of categories) {
    const products = await getProductByCategory(cat);
    if (products.find(p => p.Id === product.Id)) {
      category = cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ");
      break;
    }
  }

  breadcrumb.innerHTML = `<span>${category}</span>`;
  breadcrumb.classList.remove("hidden");
}


// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
