function Books() {
  this.info = function () {
    let book = {
      title: "Dac Nhan Tam",
      author: "Dale Carnegie",
      page: "302 pages",
      read: "reader",
    };
    console.log(
      "title of book ",
      book.title,
      "author is ",
      book.author,
      "number page ",
      book.page,
      "READ? ",
      book.read
    );
  };
}
let checkFBooks = new Books();
checkFBooks.info();
Object.prototype(checkFBooks) === Books.prototype