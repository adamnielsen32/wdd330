const baseURL = import.meta.env.VITE_SERVER_URL;
import { getLocalStorage } from "./utils.mjs";
function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'services Error', message: jsonResponse };
  }
}

export async function getProductByCategory(category, searchTerm = null) {
  let url = baseURL + `products/search/${category}`;
  if (searchTerm) {
    url = baseURL + `products/search/tents`;
  }
  const response = await fetch(url);
  
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

export function getCommentsByProductId(productId) {
  const comments = getLocalStorage("so-comments") || [];
  return comments.filter((c) => c.productId === productId);
}