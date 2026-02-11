import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { initBreadcrumb } from "./breadcrumb.js";

loadHeaderFooter();
const searchTerm = new URLSearchParams(window.location.search).get("search");
const category = "tents";
initBreadcrumb(category);
productList(".product-list", category, searchTerm);