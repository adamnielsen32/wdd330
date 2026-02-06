import { getData } from "./productData.mjs";

function productCardTemplate(product) {
    let discountHtml = "";
    let priceHtml = `$${product.ListPrice}`;

    if (product.OriginalPrice && product.OriginalPrice > product.ListPrice) {
        const discountPercent = Math.round(((product.OriginalPrice - product.ListPrice) / product.OriginalPrice) * 100);
        discountHtml = `<span class="discount-badge">${discountPercent}% OFF</span>`;
        priceHtml += ` <span class="original-price">$${product.OriginalPrice}</span>`;
    }

    return `
    <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}&category=${product.Category || 'tents'}">
            <img src="${product.Image}" alt="${product.Name}" />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">${priceHtml}</p>
            ${discountHtml}
        </a>
    </li>`;
}

function renderProducts(template, product, container) {
    const html = template(product);
    container.innerHTML += html;
}

export default async function productList(selector, category = "tents") {
    const container = document.querySelector(selector);
    if (!container) return;

    const products = await getData(category);
    products.forEach(product => renderProducts(productCardTemplate, product, container));
}
