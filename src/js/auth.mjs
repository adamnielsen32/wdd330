import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";

// check if token exists and is still valid
function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = new Date().getTime();

    // exp is in seconds → convert to ms
    if (decoded.exp * 1000 < now) {
      console.log("Token expired");
      return false;
    }

    console.log("Token valid");
    return true;

  } catch (err) {
    console.log("Invalid token");
    return false;
  }
}

// protect pages
export function checkLogin() {
  const token = getLocalStorage(tokenKey);

  if (!isTokenValid(token)) {
    localStorage.removeItem(tokenKey);

    const currentPath = window.location.pathname;

    window.location =
      `/login/index.html?redirect=${currentPath}`;

    return null;
  }

  return token;
}

// login and store token
export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);

    setLocalStorage(tokenKey, token);

    window.location = redirect;

  } catch (err) {
    alertMessage(err.message || "Login failed");
  }
}