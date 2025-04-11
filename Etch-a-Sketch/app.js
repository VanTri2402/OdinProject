let container = document.getElementById("container");
container.classList.add("grid-container");

function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // 0 - 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
let loopInput = (inputValue) => {
  container.innerHTML = "";
  for (let i = 0; i < inputValue; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-item"); // class cho từng ô

    square.addEventListener("mouseover", function () {
      square.style.backgroundColor = getRandomColor();
    });
    container.appendChild(square); // thêm vào container
  }
};

let inputJS = () => {
  let inputValue = Number(prompt("Nhap lai so o input : "));
  if (inputValue > 0 && inputValue <= 100) {
    loopInput(inputValue);
  } else if (inputValue > 100) {
    alert("Toi da chi 100 vui long nhap lai ! : ");
    inputJS();
  }
};
