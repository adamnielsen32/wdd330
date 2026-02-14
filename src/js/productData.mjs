function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getData(category = "tents", searchTerm = null) {
    const res = await fetch(`/json/${category}.json`);
    const data = await convertToJson(res);

    if (searchTerm) {
      return data.filter((item) => item.Name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return data;
    }
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
