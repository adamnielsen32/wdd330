const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category, searchTerm = null) {
  let url = baseURL + `products/search/${category}`;
  console.log(baseURL);
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