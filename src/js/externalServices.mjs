const baseURL = "http://server-nodejs.cit.byui.edu:3000";

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export async function getProductByCategory(category) {
  const response = await fetch(baseURL + `/products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `/product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "/checkout/", options).then(convertToJson);
}

export async function loginRequest(user) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };
  const response = await fetch(baseURL + "/login", options).then(convertToJson);
  return response.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await fetch(`${baseURL}orders`, options);
  const data = await response.json();
  
  if (!response.ok) {
    throw { name: "OrdersError", message: data };
  }

  return data;
}

export async function getCommentsByProductId(productId) {
  const response = await fetch(baseURL + `comments/${productId}`);
  const data = await response.json();
  if (!response.ok) throw { name: "servicesError", message: data };
  return data.Result;
}