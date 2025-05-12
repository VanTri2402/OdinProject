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

let defaultPage = container.innerHTML;
let isShowModal = false;

class Product {
  constructor(name, price, img, quantity = 1) {
    this.name = name;
    this.price = parseInt(price);
    this.img = img;
    this.quantity = quantity;
  }
}


var cart = new Cart();

btnAdd.addEventListener("click", function () {
  isShowModal = true;
  showModal();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameval = nameInp.value.trim();
  let priceval = parseInt(priceInp.value);
  let file = imgInp.files[0];
  let imgURL = URL.createObjectURL(file);
  if (!nameval || isNaN(priceval) || priceval <= 0 || !file) {
    alert("Vui lòng nhập đầy đủ và hợp lệ tất cả thông tin sản phẩm!");
    return;
  }
  let product = new Product(nameval, priceval, imgURL);

  let added = cart.add(product);
  if (added) {
    addProductToCartUI(product);
  }
  console.log("Cart hiện tại:", cart);
  nameInp.value = "";
  priceInp.value = "";
  imgInp.value = "";
  closeModal();
});

function showModal() {
  modal.style.display = "block";
}
btnCancel.addEventListener("click", closeModal);

function closeModal() {
  isShowModal = false;
  modal.style.display = "none";
}

function addProductToCartUI(product) {
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
    <div class="item-total">${formatCurrency(
      product.price * product.quantity
    )}</div>
    <div>
      <button class="remove-btn">×</button>
    </div>
  `;
  bodyCart.appendChild(cartItem);

  const minusBtn = cartItem.querySelector(".minus");
  const plusBtn = cartItem.querySelector(".plus");
  const quantityInput = cartItem.querySelector(".quantity-input");
  const itemTotal = cartItem.querySelector(".item-total");
  const removeBtn = cartItem.querySelector(".remove-btn");

  function updateItemTotal() {
    const quantity = parseInt(quantityInput.value);
    itemTotal.textContent = formatCurrency(quantity * product.price);
    payments();
  }

  plusBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 999) {
      quantity++;
      quantityInput.value = quantity;
      syncQuantityInCart(product.name, quantity);
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
      syncQuantityInCart(product.name, quantity);
      updateItemTotal();
    } else {
      alert("Số lượng phải lớn hơn 0 mới được phép trừ!");
    }
  });

  removeBtn.addEventListener("click", () => {
    cartItem.remove();
    cart.remove(product);
    payments();
  });

  payments();
}

let syncQuantityInCart = (productName, newQuantity) => {
  const item = cart.items.find((item) => item.name === productName);
  if (item) {
    item.quantity = newQuantity;
  }
};

let payments = () => {
  if (cart.items.length > 0) {
    footer.style.display = "block";
    var total = cart.getTotal();
    var totalQuan = cart.items.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    moneyTotal.textContent = formatCurrency(total);
    numQuan.textContent = `Số lượng sản phẩm: ${totalQuan}`;
  } else {
    footer.style.display = "none";
    moneyTotal.textContent = formatCurrency(0);
    numQuan.textContent = `Số lượng sản phẩm: 0`;
  }
};

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN").format(value) + " đ";
}
