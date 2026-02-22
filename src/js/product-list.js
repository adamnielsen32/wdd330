import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
 
loadHeaderFooter();
const category = getParam("category")
// Render top products list
const searchTerm = getParam("search");
productList(".product-list", category, searchTerm);