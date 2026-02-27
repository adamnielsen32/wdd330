const baseURL = import.meta.env.VITE_SERVER_URL;
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
    url += `?search=${searchTerm}`;
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