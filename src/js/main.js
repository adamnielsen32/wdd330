import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { initBreadcrumb } from "./breadcrumb.js";
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
const category = "tents";
initBreadcrumb(category);
productList(".product-list", category, searchTerm);
productList(".product-list", "tents", searchTerm);

// Register Banner
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("register-banner");
  const closeBtn = document.getElementById("close-banner");

  // Show banner only if user hasn't dismissed it
  const dismissed = localStorage.getItem("registerBannerDismissed");
  if (!dismissed) {
    banner.classList.remove("hidden");
  }

  // Close button click
  closeBtn.addEventListener("click", () => {
    banner.classList.add("hidden");
    localStorage.setItem("registerBannerDismissed", "true"); // remember dismissal
  });

  // register button click (link to registration page)
  document.getElementById("register-now").addEventListener("click", () => {
    window.location.href = "/register/index.html";
  });
});