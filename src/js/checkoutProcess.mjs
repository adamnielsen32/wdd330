import { getLocalStorage, calculateCartTotal, setLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs"
import { alertMessage } from "./utils.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();

    },
    calculateItemSummary: function() {
        this.itemTotal = calculateCartTotal(this.list);
    },

    calculateOrdertotal: function() {
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
    },
    displayOrderTotals: function() {
        const outputElement = document.querySelector(this.outputSelector);
        if (outputElement) {
            outputElement.innerHTML = `
                <p>Item Subtotal: $${this.itemTotal.toFixed(2)}</p>
                <p>Shipping: $${this.shipping.toFixed(2)}</p>
                <p>Tax: $${this.tax.toFixed(2)}</p>
                <p>Order Total: $${this.orderTotal.toFixed(2)}</p>
            `;
        }
    },
    checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log("json: Line 71", json);
    try {
      // "checkout" already converts the Response to JSON and throws on bad status,
      // so `res` is the parsed body – it does not have an `ok` property.
      const res = await checkout(json);
      console.log("Checkout response:", res);

      // if we reached here the request succeeded; you can inspect the body for
      // whatever your API returns (e.g. res.Result or res.success) and act on it.
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
      
    } catch (err) {
      alertMessage("Checkout failed. Please try again.", true, 3000)
      console.log(err);
    }
  },
};




export default checkoutProcess;