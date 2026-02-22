import {getProductByCategory} from "./externalServices.mjs";


function productCardTemplate(product) {
    console.log(product.Images)
    return `
    <li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
            <img
              src="${product.Images.PrimaryMedium}"
              alt="${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.ListPrice}</p></a>
            </li>`;
}

export default async function productList(selector, category, searchTerm = null) {
    const container = document.querySelector(selector);

    const products = await getProductByCategory(category, searchTerm);
   console.log(products); 
    products.map(product => renderProducts(productCardTemplate, product, container));
}

function renderProducts(template, product, container) {
    const html = template(product);
    container.innerHTML += html;
}

