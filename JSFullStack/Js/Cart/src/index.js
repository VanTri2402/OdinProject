// src/index.js
import { Cart } from "./module/cart.js";
import { handleFormSubmit } from "./module/form.js";
import {
  addProductToCartUI,
  updatePayments,
  showModal,
  closeModal,
} from "./module/ui.js";
import "./style.css";
let btnAdd = document.querySelector(".add-product");
let container = document.querySelector(".container");
let modal = document.querySelector(".modal");
let bodyCart = document.querySelector(".body-primary-cart");
let footer = document.querySelector(".footer");
let numQuan = document.querySelector(".num-quan");
let moneyTotal = document.querySelector(".money-total");
let btnCancel = document.querySelector(".btn-cancel");
let nameInp = document.getElementById("productName");
let priceInp = document.getElementById("productPrice");
let imgInp = document.getElementById("productImage");
let form = document.getElementById("addProductForm");

const cart = new Cart();

btnAdd.addEventListener("click", () => {
  showModal(modal);
});

btnCancel.addEventListener("click", () => {
  closeModal(modal);
});

form.addEventListener("submit", (e) => {
  handleFormSubmit(
    e,
    cart,
    { nameInp, priceInp, imgInp },
    (product) =>
      addProductToCartUI(product, cart, bodyCart, () =>
        updatePayments(cart, moneyTotal, numQuan, footer)
      ),
    () => closeModal(modal)
  );
});
