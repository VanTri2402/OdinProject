// src/module/ui.js
import { formatCurrency } from "./utils.js";

export function showModal(modal) {
  modal.style.display = "block";
}

export function closeModal(modal) {
  modal.style.display = "none";
}

export function addProductToCartUI(product, cart, bodyCart, paymentsCallback) {
  let cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <div class="cart-item-info">
      <div class="cart-item-img">
        <img src='${product.img}' alt="" />
      </div>
      <div class="cart-item-name">${product.name}</div>
    </div>
    <div class="cart-item-price">${formatCurrency(product.price)}</div>
    <div class="quantity-control">
      <button class="quantity-btn minus">-</button>
      <input type="text" class="quantity-input" value="${product.quantity}" />
      <button class="quantity-btn plus">+</button>
    </div>
    <div class="item-total">${formatCurrency(product.price)}</div>
    <div>
      <button class="remove-btn">×</button>
    </div>`;

  bodyCart.appendChild(cartItem);

  const minusBtn = cartItem.querySelector(".minus");
  const plusBtn = cartItem.querySelector(".plus");
  const quantityInput = cartItem.querySelector(".quantity-input");
  const itemTotal = cartItem.querySelector(".item-total");
  const removeBtn = cartItem.querySelector(".remove-btn");

  function updateItemTotal() {
    const quantity = parseInt(quantityInput.value);
    itemTotal.textContent = formatCurrency(quantity * product.price);
    paymentsCallback();
  }

  plusBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 999) {
      quantity++;
      quantityInput.value = quantity;
      cart.syncQuantity(product.name, quantity);
      updateItemTotal();
    } else {
      alert("Số lượng sản phẩm đã đạt mức tối đa!");
    }
  });

  minusBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity--;
      quantityInput.value = quantity;
      cart.syncQuantity(product.name, quantity);
      updateItemTotal();
    } else {
      alert("Số lượng phải lớn hơn 0 mới được phép trừ!");
    }
  });

  removeBtn.addEventListener("click", () => {
    cartItem.remove();
    cart.remove(product);
    paymentsCallback();
  });

  paymentsCallback();
}

export function updatePayments(cart, moneyTotal, numQuan, footer) {
  if (cart.items.length > 0) {
    footer.style.display = "block";
    moneyTotal.textContent = formatCurrency(cart.getTotal());
    numQuan.textContent = `Số lượng sản phẩm: ${cart.getTotalQuantity()}`;
  } else {
    footer.style.display = "none";
    moneyTotal.textContent = "0 đ";
    numQuan.textContent = "Số lượng sản phẩm: 0";
  }
}
