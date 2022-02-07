
function onInit() {
  createBooks();
}

function onAddBook() {
  var nameBook = document.querySelector('input[name="bookname"]');
  var priceBook = document.querySelector('input[name="price"]');
  var gbook = createBook(nameBook.value, priceBook.value);
  addBook(gbook);
  renderBooks();
  flashMsg(`Book Add`);
  nameBook.value = "";
  priceBook.value = "";
}
function onReadBook(bookId) {
  readBook(bookId);
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
  flashMsg(`Book Deleted`);
}

function onUpdateBook(bookId) {
  var bookPrice = prompt("what the new price of the book?");
  updateBook(bookId, bookPrice);
  renderBooks();
  flashMsg(`price updated to: ${bookPrice}`);
}

function closeModal() {
  var elModal = document.querySelector(".modal");
  elModal.classList.remove("modal");
  elModal.classList.add("modalClosed");
  elModal.innerHTML = "";
}

function flashMsg(msg) {
  const el = document.querySelector(".user-msg");
  el.innerText = msg;
  el.classList.add("open");
  setTimeout(() => {
    el.classList.remove("open");
  }, 3000);
}


function onSetSortBy(sortBy) {
  setBookSort(sortBy)
  renderBooks();
}
