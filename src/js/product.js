import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}

async function addToCartHandler(e) {
  e.preventDefault();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

let cartButton = document.querySelector(".product-detail__add");
let cartIcon = document.querySelector(".cart-icon");

function cartanimation() {
  cartIcon.classList.add("animation");
  setTimeout(() => {
    cartIcon.classList.remove("animation");
  }, 3000);
}
cartButton.addEventListener("click", cartanimation);

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);