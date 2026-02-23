import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

console.log("product-list.js loaded");

loadHeaderFooter();

const category = getParam("category");
const searchTerm = getParam("search");

// initial render

document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.querySelector("#sort");
  const initialSort = sortSelect ? sortSelect.value : "name-asc";
  productList(".product-list", category, searchTerm, initialSort);
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      console.log("Sort changed:", sortSelect.value);
      productList(".product-list", category, searchTerm, sortSelect.value);
    });
  }
});