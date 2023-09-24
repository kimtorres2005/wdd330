import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

if (!getLocalStorage("so-cart")) {
  setLocalStorage("so-cart", []);
}

function addProductToCart(product) {
  let cart = getLocalStorage("so-cart");

  if (!Array.isArray(cart)) {
    cart = [];
  }

  cart.push(product);

  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  e.preventDefault();
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
