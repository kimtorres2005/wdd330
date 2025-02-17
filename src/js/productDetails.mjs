import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { getDiscountPrice } from "./productList.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // then add the current product to the list
  product.item.Quantity = 1;
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
}
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  const discountPrice = getDiscountPrice(product);
  document.querySelector("#productDiscountPrice").innerText = discountPrice;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
// function addToCart() {
//   const currentCart = getLocalStorage("so-cart") || [];

//   const existingProduct = currentCart.find((item) => item.Id === product.Id);

//   if (existingProduct) {
//     existingProduct.Quantity += 1;
//   } else {
//     product.Quantity = 1;
//     currentCart.push(product);
//   }

//   setLocalStorage("so-cart", currentCart);
// }

