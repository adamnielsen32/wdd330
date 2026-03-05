import { login } from "../js/auth.mjs";
import { getParam, loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();

const redirect = getParam("redirect") || "/";

document.querySelector("#loginButton").addEventListener("click", async (e) => {
  e.preventDefault(); 

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  try {
    await login({ email, password }, redirect);
  } catch (err) {
    console.error(err);
    alert("Login failed. Please check your credentials.");
  }
});