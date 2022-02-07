const STORAGE_KEY = "bookDB";
var gBooks;
var gBook;
var  gSortBy;


function createBooks() {
  gBooks = loadFromStorage(STORAGE_KEY);
  if (!gBooks) {
    gBooks = [
      createBook("harry potter",50),
      createBook("sherlock", 80),
      createBook("game of thorns", 25),
    ];
  }
  _saveBooksToStorage(STORAGE_KEY);
  renderBooks();
}

function renderBooks() {
  gBooks = loadFromStorage(STORAGE_KEY);
  var strHTML = `<tbody class="table">`;
  for (var i = 0; i < gBooks.length; i++) {
    strHTML += `<tr>`;
    strHTML += `<td class='cell'> ${gBooks[i].name}</td> `;
    strHTML += `<td class='cell'> ${gBooks[i].id}</td> `;
    strHTML += `<td class='cell'> ${gBooks[i].price} $</td> `;
    strHTML += `<td class='cell'> ${gBooks[i].imgUrl}</td> `;
    strHTML += `<td class='cellBtn'><button class="Btn" onclick="onReadBook('${gBooks[i].id}')"> read </button>
    <button class="Btn" onclick="onUpdateBook('${gBooks[i].id}')"> update </button>
    <button class="Btn" onclick="onRemoveBook('${gBooks[i].id}')"> delete </button>
    </td>`;
    strHTML += `<td><input type="range" min="0" max="10" value="${gBooks[i].rate}" onchange="this.title=this.value;changeRate(this.value , '${gBooks[i].id}')"/> Rate </td>`
    strHTML += `</tr>`;
  }
  strHTML += `</tbody>`;
  var elContainer = document.querySelector(".container");
  elContainer.innerHTML = strHTML;
}

function createBook(name,price) {
  var gBook = {
    name,
    id: makeId(),
    price,
    imgUrl: `<img src='img/${name}.jpeg'  alt='${name}'>`,
    rate:0
  };
  return gBook;
}

function addBook(gBook){
    gBooks.push(gBook);
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks);
}
function readBook(bookId) {
    var id = bookId;
    var idx = gBooks.findIndex((book) => book.id === id);
    var book= gBooks[idx] ;
    var strHTML=`<li>name: ${book.name}</li>,
    <li>id:${book.id}</li>,
    <li>price:${book.price}</li>,
    <li>rate:${book.rate}</li>,
    ${book.imgUrl}`
  var elModal = document.querySelector(".modalClosed");
  elModal.classList.remove("modalClosed");
  elModal.classList.add("modal");
  elModal.innerHTML +=
    `<button class='closeModal'onclick="closeModal()">x</button> ` + strHTML;
}

function changeRate(rate,bookId) {
    var idx = gBooks.findIndex((book) => book.id === bookId);
    gBooks[idx].rate=rate
    _saveBooksToStorage(STORAGE_KEY, gBooks);
    renderBooks()
    flashMsg(`Book rate changed`);

}

function removeBook(bookId) {
  var id = bookId;
  var idx = gBooks.findIndex((book) => book.id === id);
  if (idx > -1) {
    gBooks.splice(idx, 1);
  }
  _saveBooksToStorage(STORAGE_KEY, gBooks);
}

function updateBook(bookId, bookPrice) {
  var id = bookId;
  var idx = gBooks.findIndex((book) => book.id === id);
  if (idx > -1) {
    gBooks[idx].price = bookPrice;
  }
  _saveBooksToStorage();
}

function setBookSort(sortBy){
  gSortBy= sortBy
  gUsers= _getBookForSort(gSortBy)
}


function _getBookForSort(sortBy) {
  if(sortBy==='name'){
      gBooks.sort(function (a, b){
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());})
  }else if(sortBy==='price'){
    gBooks.sort((a, b) => a.price - b.price)
  }
  _saveBooksToStorage(STORAGE_KEY, gBooks);
  
}