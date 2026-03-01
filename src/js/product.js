import { getParam } from "./utils.mjs";
import { getProductByCategory } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productId = getParam("product");
const commentData = getParam("data");

init();

async function init() {
  if (commentData) {
  logCommentData(commentData);
  }
  const product = await productDetails(productId);
  await renderBreadcrumb(product);
}

function logCommentData(data) {
  try {
    const comment = JSON.parse(decodeURIComponent(data));
    console.log("Received comment data:", comment);
  } catch (error) {
    console.error("Failed to parse comment data:", error);
  }
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

// --- SORT DROPDOWN HANDLER ---
const sortSelect = document.querySelector("#sort");

if (sortSelect) {
  sortSelect.addEventListener("change", () => {
    console.log("Selected sort:", sortSelect.value);
  });
}

// --- COMMENT FORM HANDLER ---
document.getElementById("productReviewForm").addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const dataObject = Object.fromEntries(formData.entries());
  
  // Load existing comments from localStorage
  let comments = JSON.parse(localStorage.getItem("so-comments") || "[]");
  comments.push(dataObject);
  
  // Save back to localStorage
  localStorage.setItem("so-comments", JSON.stringify(comments));
  console.log("Comment saved:", dataObject);
  
  // Clear the form
  event.target.reset();
  window.location.reload()
});

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
