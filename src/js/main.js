import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
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
productList(".product-list", "tents");
