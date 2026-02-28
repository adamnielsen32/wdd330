import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // Guard: missing product id
  if (!productId) {
    renderProductNotFound();
    return;
  }

  product = await findProductById(productId);

  // Guard: product not found
  if (!product) {
    renderProductNotFound();
    return;
  }

  // Normal behavior
  renderProductDetails(product);
console.log("Product details loaded:", product);
  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () =>
      addProductToCart(product)
    );
  }
}

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  const exists = cartItems.some(item => item.Id === product.Id);
  if (!exists) {
    product.Quantity = 1;
    cartItems.push(product);
    console.log("Added cartItems:", cartItems);
    setLocalStorage("so-cart", cartItems);
  } else {
    console.log("Product already in cart:", product);
    for (const item of cartItems) {
      if (item.Id === product.Id) {
        item.Quantity =item.Quantity? (item.Quantity += 1) : 2;
        break;
      }
    }
    setLocalStorage("so-cart", cartItems);
      
    };

    //Cart bag animation after you add to cart
  let cart = document.querySelector(".cart");
  if (cart) {
    cart.classList.add("cart--actived");
    cart.classList.add("animate-bounce");
    cart.addEventListener(
      "animationend",
      () => {
        cart.classList.remove("animate-bounce");
      },
      { once: true }
    );
  }
}

function renderProductDetails(product) {
  document.getElementById("productName").textContent = product.Name;
  document.getElementById("productNameWithoutBrand").textContent =
    product.NameWithoutBrand;

  const image = document.getElementById("productImage");
  image.src = product.Images.PrimaryLarge;
  image.alt = product.Name;

  // Image carousel logic
  const mainImageContainer = image.parentElement;
  // Remove any previous carousel
  const oldCarousel = document.getElementById("image-carousel");
  if (oldCarousel) oldCarousel.remove();

  // Gather all images (main + extras)
  let allImages = [
    { src: product.Images.PrimaryLarge, alt: product.Name }
  ];
  if (product.Images.ExtraImages && Array.isArray(product.Images.ExtraImages)) {
    allImages = allImages.concat(
      product.Images.ExtraImages.map((img, idx) => ({ src: img, alt: product.Name + " extra " + (idx + 1) }))
    );
  }

  if (allImages.length > 1 && mainImageContainer) {
    const carousel = document.createElement("div");
    carousel.id = "image-carousel";
    carousel.style.display = "flex";
    carousel.style.gap = "0.5em";
    carousel.style.margin = "0.5em 0";
    allImages.forEach((imgObj, idx) => {
      const thumb = document.createElement("img");
      thumb.src = imgObj.src;
      thumb.alt = imgObj.alt;
      thumb.style.width = "48px";
      thumb.style.height = "48px";
      thumb.style.objectFit = "cover";
      thumb.style.border = idx === 0 ? "2px solid #333" : "1px solid #ccc";
      thumb.style.cursor = "pointer";
      thumb.addEventListener("click", () => {
        image.src = imgObj.src;
        image.alt = imgObj.alt;
        Array.from(carousel.children).forEach(t => t.style.border = "1px solid #ccc");
        thumb.style.border = "2px solid #333";
      });
      carousel.appendChild(thumb);
    });
    mainImageContainer.insertBefore(carousel, image.nextSibling);
  }

  const priceElement = document.getElementById("productPrice");

  // Discount flag logic
  let discountFlag = "";
  if (
    product.FinalPrice &&
    product.FinalPrice < product.ListPrice
  ) {
    const discountPercent = Math.round(
      ((product.ListPrice - product.FinalPrice) / product.ListPrice) * 100
    );
    discountFlag = `<span class="discount-badge" style="background: #ffe0e0; color: #b00; font-weight: bold; padding: 0.2em 0.5em; border-radius: 4px; margin-bottom: 0.5em; display: inline-block;">${discountPercent}% OFF</span><br/>`;
    priceElement.innerHTML = `
      ${discountFlag}
      <span style="text-decoration: line-through; color: #777;">
        $${product.ListPrice.toFixed(2)}
      </span>
      <span style="color: darkred; font-weight: bold; margin-left: 0.5rem;">
        $${product.FinalPrice.toFixed(2)}
      </span>
    `;
  } else {
    priceElement.textContent = `$${product.ListPrice.toFixed(2)}`;
  }

  document.getElementById(
    "productColor"
  ).textContent = `Color: ${product.Colors[0].ColorName}`;

  document.getElementById("productDescription").innerHTML =
    product.DescriptionHtmlSimple;
}

function renderProductNotFound() {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="product-not-found">
      <h2>Product Not Found</h2>
      <p>Sorry, the product you are trying to view does not exist.</p>
      <a href="/index.html">Return to Home</a>
    </section>
  `;
}
