import {loadHeaderFooter} from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";


loadHeaderFooter();

checkoutProcess.init("so-cart", "#order-summary");
checkoutProcess.calculateOrdertotal();
checkoutProcess.displayOrderTotals();

document.forms["checkout-form"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  checkoutProcess.checkout(e.target);
});

// listening for click on the button
// document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
//   e.preventDefault();

//   checkoutProcess.checkout(document.forms['checkout']);
// });