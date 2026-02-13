import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
 
loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);
// Render top products list
const searchTerm = new URLSearchParams(window.location.search).get("search");
productList(".product-list", "tents", searchTerm);