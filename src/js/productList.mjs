import {getData} from "./productData.mjs";


function productCardTemplate(product) {
    return `
    <li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
            <img
              src="${product.Image}"
              alt="${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">${product.ListPrice}</p></a>
            </li>`;
}

export default async function productList(selector, category) {
    const container = document.querySelector(selector);

    const products = await getData(category);

    products.map(product => renderProducts(productCardTemplate, product, container));

}

function renderProducts(template, product, container) {
    const html = template(product);
    container.innerHTML += html;
}

