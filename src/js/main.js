import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const searchTerm = new URLSearchParams(window.location.search).get("search");
productList(".product-list", "tents", searchTerm);