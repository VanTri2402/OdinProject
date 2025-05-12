const titleInp = document.getElementById("input");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
const btnAdd = document.querySelector(".btn-add");
const listTask = document.getElementById("list-container");

let arrTask = [];

function sanitizeInput(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;") || "";
}

function Task(title, description, dueDate, priority, check) {
  this.title = sanitizeInput(title);
  this.description = sanitizeInput(description) || "Không có mô tả";
  this.dueDate = dueDate || "Chưa xác định";
  this.priority = priority || "Trung bình";
  this.check = check || false;
}

Task.prototype.infoTask = function () {
  return `${this.title}: ${this.description}, Hết hạn: ${this.dueDate}, Ưu tiên: ${this.priority}`;
};

Task.prototype.toggleComplete = function () {
  this.check = !this.check;
};

function loadTasks() {
  try {
    const data = localStorage.getItem("tasks");
    if (data) {
      arrTask = JSON.parse(data).map(
        (t) => new Task(t.title, t.description, t.dueDate, t.priority, t.check)
      );
      renderTask();
    }
  } catch (error) {
    console.error("Lỗi khi tải tasks từ localStorage:", error);
    arrTask = [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem("tasks", JSON.stringify(arrTask));
  } catch (error) {
    console.error("Lỗi khi lưu tasks vào localStorage:", error);
  }
}

function validInp(title, description, dueDate, priority) {
  const today = new Date().toISOString().split("T")[0];
  if (dueDate && dueDate < today) {
    alert("Ngày hết hạn phải là ngày hiện tại hoặc tương lai!");
    return false;
  }
  if (!title || !dueDate) {
    alert("Vui lòng nhập các trường bắt buộc: tiêu đề và ngày hết hạn!");
    return false;
  }
  return true;
}

function addTask(title, description, dueDate, priority, check) {
  let newTask = new Task(title, description, dueDate, priority, check);
  arrTask.push(newTask);
  saveTasks();
  renderTask();
  titleInp.value = "";
  description.value = "";
  dueDate.value = "";
  priority.value = "Trung bình";
}

function renderTask() {
  listTask.innerHTML = "";
  const priorityMap = {
    Cao: "high",
    "Trung bình": "medium",
    Thấp: "low",
  };

  arrTask.forEach((task, index) => {
    let li = document.createElement("li");
    li.classList.add("todo-item", priorityMap[task.priority] || "medium");
    if (task.check) li.classList.add("completed");
    li.setAttribute("role", "listitem");

    const span = document.createElement("span");
    span.textContent = task.infoTask();

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-complete");
    toggleBtn.textContent = task.check ? "Hoàn tác" : "Hoàn thành";
    toggleBtn.setAttribute("aria-label", `Chuyển đổi trạng thái ${task.title}`);
    toggleBtn.addEventListener("click", () => {
      task.toggleComplete();
      saveTasks();
      renderTask();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.setAttribute("aria-label", `Xóa ${task.title}`);
    deleteBtn.addEventListener("click", () => {
      arrTask.splice(index, 1);
      saveTasks();
      renderTask();
    });

    li.append(span, toggleBtn, deleteBtn);
    listTask.appendChild(li);
  });
}

btnAdd.addEventListener("click", function () {
  let title = titleInp.value.trim();
  let desc = description.value.trim();
  let due = dueDate.value;
  let pri = priority.value;
  let check = false;
  if (validInp(title, desc, due, pri)) {
    addTask(title, desc, due, pri, check);
  }
});

titleInp.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let title = titleInp.value.trim();
    let desc = description.value.trim();
    let due = dueDate.value;
    let pri = priority.value;
    let check = false;
    if (validInp(title, desc, due, pri)) {
      addTask(title, desc, due, pri, check);
    }
  }
});

// Khởi tạo danh sách từ localStorage
loadTasks();

// Thêm công việc mẫu
addTask("Học JavaScript", "Luyện tập hằng ngày", "2025-01-01", "Cao", false);
addTask(
  "Làm bài tập",
  "Giải bài JavaScript",
  "2025-02-01",
  "Trung bình",
  false
);
