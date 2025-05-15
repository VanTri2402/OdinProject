let pre = document.querySelector(".prev");
let next = document.querySelector(".next"); // bạn nhầm class là ".right" — HTML là "next"
let primary = document.querySelector(".img");

let imgs = [
  "../../Cart/src/assets/ipad.jpg",
  "../../Cart/src/assets/iphone.jpg",
  "../../Cart/src/assets/mac.jpg",
];

let currentIndex = 0;

pre.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imgs.length - 1;
  }
  primary.src = imgs[currentIndex];
});

next.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex >= imgs.length) {
    currentIndex = 0;
  }
  primary.src = imgs[currentIndex];
});
