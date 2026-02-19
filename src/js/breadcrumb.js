import { getProductByCategory } from "./externalServices.mjs";

const breadcrumb = document.getElementById("breadcrumb");

// Hide breadcrumb on home page
if (window.location.pathname.includes("index.html") && !window.location.pathname.includes("product_pages")) {
  breadcrumb.classList.add("hidden");
}

// Initialize breadcrumb for product list page
export async function initBreadcrumb(category) {
  if (!breadcrumb) return;
  
  const products = await getProductByCategory(category);
  const itemCount = products.length;
  
  breadcrumb.innerHTML = `<span>${category.charAt(0).toUpperCase() + category.slice(1)} -> (${itemCount} items)</span>`;
  breadcrumb.classList.remove("hidden");
}
