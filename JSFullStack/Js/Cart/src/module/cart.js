// src/module/cart.js
export class Product {
  constructor(name, price, img, quantity = 1) {
    this.name = name;
    this.price = parseInt(price);
    this.img = img;
    this.quantity = quantity;
  }
}

export class Cart {
  constructor() {
    this.items = [];
  }

  add(product) {
    const existItem = this.items.find((item) => item.name === product.name);
    if (existItem) {
      alert("Sản phẩm đã có trong giỏ hàng! Vui lòng điều chỉnh số lượng.");
      return false;
    } else {
      this.items.push(product);
      return true;
    }
  }

  remove(product) {
    const index = this.items.findIndex((item) => item.name === product.name);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  syncQuantity(productName, newQuantity) {
    const item = this.items.find((item) => item.name === productName);
    if (item) {
      item.quantity = newQuantity;
    }
  }

  getTotal() {
    return this.items.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  getTotalQuantity() {
    return this.items.reduce((sum, p) => sum + p.quantity, 0);
  }
}
