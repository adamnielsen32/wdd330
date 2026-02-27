import {getProductByCategory} from "./externalServices.mjs";

function calculateDiscount(original, final) {
  return Math.round(((original - final) / original) * 100);
}

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
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
  searchTerm = null,
  sort = "name-asc"
) {
  const container = document.querySelector(selector);
  container.innerHTML = "<li class=\"loading\">Loading products...</li>";
  try {
    const products = await getProductByCategory(category, searchTerm);
    // console.log(products);

    if (!products || !products.length) {
      container.innerHTML = "<li class=\"error\">No products found.</li>";
      return;
    }

    // apply sorting
    let sorted = [...products];
    if (sort === "name-asc") {
      sorted.sort((a, b) =>
        (a.NameWithoutBrand || "").localeCompare(b.NameWithoutBrand || "")
      );
    } else if (sort === "price-asc") {
      sorted.sort((a, b) => (a.ListPrice || 0) - (b.ListPrice || 0));
    } else if (sort === "price-desc") {
      sorted.sort((a, b) => (b.ListPrice || 0) - (a.ListPrice || 0));
    }

    // render
    container.innerHTML = sorted.map((p) => productCardTemplate(p)).join("");
  } catch (err) {
    container.innerHTML = `<li class="error">Error loading products. Please try again.</li>`;
    // console.error("Product list error:", err);
  }
}


