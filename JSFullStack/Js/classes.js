// class User {
//   name = "Van tri";
//   #password = "secret";

//   constructor(age) {
//     this.age = age;
//   }
//   get Info() {
//     return `my name is ${this.name} with age ${this.age}`;
//   }
//   set setInfo(value) {
//     this.name = value.name;
//     this.age = value.age;
//   }
//   hello() {
//     return "Hello";
//   }
//   static sayHi() {
//     return "Hi";
//   }
// }
// class Admin extends User {
//   constructor(age, role) {
//     super(age);
//     this.role = role;
//   }
// }
// let value = {
//   name: "trum",
//   age: 15,
// };

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Cart {
  items = [];

  add(product) {
    this.items.push(product);
  }

  getTotal() {
    return this.items.reduce((sum, p) => sum + p.price, 0);
  }

  getNameSP() {
    return this.items
      .map((item, index) => `name of SP thu ${index + 1} is ${item.name}`)
      .join("\n");
  }
}

let product = new Product("laptop", 3000);
let cart = new Cart();

cart.add(new Product("phone", 1000));
cart.add(product);

console.log("Tổng tiền:", cart.getTotal());
console.log(cart.getNameSP());
