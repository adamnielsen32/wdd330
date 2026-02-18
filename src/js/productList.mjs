import { getData } from "./productData.mjs";

function calculateDiscount(original, final) {
  return Math.round(((original - final) / original) * 100);
}

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

        <p class="product-card__price">
          ${
            product.SuggestedRetailPrice &&
            product.ListPrice < product.SuggestedRetailPrice
              ? `
                <span class="discount-badge">
                  ${calculateDiscount(
                    product.SuggestedRetailPrice,
                    product.ListPrice
                  )}% OFF
                </span>
                <span class="final-price">$${product.ListPrice}</span>
                <span class="original-price">$${product.SuggestedRetailPrice}</span>
              `
              : `$${product.ListPrice}`
          }
        </p>
      </a>
    </li>`;
}

export default async function productList(
  selector,
  category,
  searchTerm = null
) {
  const container = document.querySelector(selector);

  const products = await getData(category, searchTerm);

  products.map((product) =>
    renderProducts(productCardTemplate, product, container)
  );
}

function renderProducts(template, product, container) {
  const html = template(product);
  container.innerHTML += html;
}
