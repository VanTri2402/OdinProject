// Import CSS
import "./styles.css";

// Các hàm tính toán đơn giản
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Hàm khởi tạo ứng dụng
function initApp() {
  // Thêm nội dung vào container
  const container = document.querySelector(".container");

  // Tạo giao diện
  const content = document.createElement("div");
  content.innerHTML = `
    <div>
      <h2>Máy tính đơn giản</h2>
      <div>
        <input type="number" id="num1" placeholder="Số thứ nhất" value="5" />
        <input type="number" id="num2" placeholder="Số thứ hai" value="3" />
      </div>
      <div>
        <button id="addBtn" class="btn">Cộng</button>
        <button id="subtractBtn" class="btn">Trừ</button>
      </div>
      <div class="result" id="result">
        Kết quả sẽ hiển thị ở đây
      </div>
    </div>
  `;

  container.appendChild(content);

  // Thêm sự kiện cho các nút
  document.getElementById("addBtn").addEventListener("click", handleAdd);
  document
    .getElementById("subtractBtn")
    .addEventListener("click", handleSubtract);
}

// Xử lý sự kiện nút Cộng
function handleAdd() {
  const num1 = parseFloat(document.getElementById("num1").value) || 0;
  const num2 = parseFloat(document.getElementById("num2").value) || 0;
  const result = add(num1, num2);

  document.getElementById(
    "result"
  ).textContent = `${num1} + ${num2} = ${result}`;
}

// Xử lý sự kiện nút Trừ
function handleSubtract() {
  const num1 = parseFloat(document.getElementById("num1").value) || 0;
  const num2 = parseFloat(document.getElementById("num2").value) || 0;
  const result = subtract(num1, num2);

  document.getElementById(
    "result"
  ).textContent = `${num1} - ${num2} = ${result}`;
}

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", initApp);
