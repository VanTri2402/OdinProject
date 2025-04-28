let btnClose = document.querySelector("#closeDialog");
let btnOpen = document.querySelector("#openDialog");
let boxDialog = document.querySelector("#dialog");
let btnAddBook = document.querySelector(".btnModalAdd");
let nameBook = document.querySelector(".nameBook");
let authorBook = document.querySelector(".authorBook");
let pagesBook = document.querySelector(".pagesBook");
let readBook = document.querySelector(".readBook");

btnClose.addEventListener("click", function () {
  boxDialog.close();
});

btnOpen.addEventListener("click", function () {
  boxDialog.showModal();
});
let mylibrary = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.ID = crypto.randomUUID();
}
Book.prototype.info = function () {
  return `Title of book is ${this.title} with author is ${this.author} , and ${this.pages} page , status is ${this.read}  `;
};
function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  mylibrary.push(newBook);
  return newBook;
}

let bookDNT = addBookToLibrary("DNT", "DALE", "298", "read");
let bookNGLG = addBookToLibrary("NGLG", "HILL", "343", "notRead");

function readBooks() {
  mylibrary.forEach((book) => {});
}
readBooks();

btnAddBook.addEventListener("click", function (e) {
  e.preventDefault();

  let title = nameBook.value;
  let author = authorBook.value;
  let pages = pagesBook.value;
  let read = readBook.value;
  addBookToLibrary(title, author, pages, read);
  console.log(...mylibrary);

  if (!title || !author || !pages || !read) {
    alert("Vui lòng nhập đầy đủ");
  }
  renderLibrary();
  boxDialog.close();
});

let renderLibrary = () => {
  let containerLibrary = document.querySelector(".library");
  containerLibrary.innerHTML = "";

  // Render từng cuốn sách
  mylibrary.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.dataset.id = book.ID;
    bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <p>${book.read}</p>
        <button class="delete-btn">Xóa</button>
         <select class="status-btn">
          <option value="isRead" ${
            book.read === "isRead" ? "selected" : ""
          }>Đã đọc</option>
          <option value="notRead" ${
            book.read === "notRead" ? "selected" : ""
          }>Chưa đọc</option>
        </select>
          `;
    containerLibrary.appendChild(bookDiv);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const bookId = this.parentElement.dataset.id;
      mylibrary = mylibrary.filter((book) => book.ID !== bookId);
      renderLibrary();
    });
  });
  document.querySelectorAll(".status-btn").forEach((option) => {
    option.addEventListener("change", function () {
      const bookId = this.parentElement.dataset.id;
      const book = mylibrary.find((book) => book.ID === bookId);
      if (book) {
        book.read = this.value;
        renderLibrary(); // Cập nhật lại giao diện
      }
    });
  });
};
renderLibrary();
