// src/module/form.js
import { Product } from "./cart.js";

export function handleFormSubmit(
  e,
  cart,
  formElements,
  addProductUICallback,
  closeModalCallback
) {
  e.preventDefault();
  const { nameInp, priceInp, imgInp } = formElements;
  const nameval = nameInp.value.trim();
  const priceval = parseInt(priceInp.value);
  const file = imgInp.files[0];

  if (!nameval || isNaN(priceval) || priceval <= 0 || !file) {
    alert("Vui lòng nhập đầy đủ và hợp lệ tất cả thông tin sản phẩm!");
    return;
  }

  const imgURL = URL.createObjectURL(file);
  const product = new Product(nameval, priceval, imgURL);

  const added = cart.add(product);
  if (added) {
    addProductUICallback(product);
  }

  nameInp.value = "";
  priceInp.value = "";
  imgInp.value = "";
  closeModalCallback();
}
