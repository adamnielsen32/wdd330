import { checkLogin } from "../js/auth.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";
import { getOrders } from "../js/externalServices.mjs";

loadHeaderFooter();

async function displayOrders() {
  const token = checkLogin();
  if (!token) return;

  try {
    const orders = await getOrders(token);
    const tbody = document.querySelector("#orders tbody");
    tbody.innerHTML = "";

    orders.forEach(order => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${order.id}</td>
        <td>${new Date(order.date).toLocaleString()}</td>
        <td>${order.items.length}</td>
        <td>$${order.total.toFixed(2)}</td>
      `;

      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load orders.");
  }
}

displayOrders();