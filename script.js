const titelvalue = document.querySelector("#title");
const authorvalue = document.querySelector("#author");
const isbnvalue = document.querySelector("#isbn");
const form = document.querySelector("form");
const tablebody = document.querySelector("tbody");
const display = document.querySelector(".display");
const submitbutton = document.querySelector("#submit");

// event listener
form.addEventListener("submit", add_book_to_table);
document.addEventListener(
  "DOMContentLoaded",
  get_book_from_local_storage_and_add_to_table
);
// Create funtionality
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
  static createbook(book) {
    let row = document.createElement("tr");
    let td = document.createElement("td");
    let a = document.createElement("a");
    let abbr = document.createElement("abbr");
    row.innerHTML = `<td class="td">${book.title}</td>
        <td class="td">${book.author}</td>
        <td class="td">${book.isbn}</td>`;
    abbr.setAttribute("title", "Delete");
    a.classList.add("a");
    a.setAttribute("href", "#");
    a.innerText = "X";
    abbr.appendChild(a);
    td.appendChild(abbr);
    row.appendChild(td);
    return row;
  }
}

// localStorage add funtionality
class Store {
  static get_books_from_local_storage() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addbooks_to_local_storage(book) {
    try {
      let books = Store.get_books_from_local_storage();
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
    } catch {
      showerror("green", "please try again!", "red");
      localStorage.clear();
    }
  }
  static delete_book_from_local_storage(isbn) {
    let books = Store.get_books_from_local_storage();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

function get_book_from_local_storage_and_add_to_table() {
  let books = Store.get_books_from_local_storage();
  books.forEach((book) => {
    let row = Book.createbook(book);
    tablebody.appendChild(row);
    bindkey(row, delete_book_from_list);
  });
}

function add_book_to_table(e) {
  e.preventDefault();
  if (
    titelvalue.value === "" ||
    authorvalue.value === "" ||
    isbnvalue.value === ""
  ) {
    showerror("green", "Add All Information First !", "red");
  } else {
    let book = new Book(titelvalue.value, authorvalue.value, isbnvalue.value);
    let row = Book.createbook(book);
    tablebody.appendChild(row);
    Store.addbooks_to_local_storage(book);
    bindkey(row, delete_book_from_list);
    showsuccess("green", "Book Added Successfully !", "red");
    titelvalue.value = "";
    authorvalue.value = "";
    isbnvalue.value = "";
  }
}


function bindkey(row, callback) {
  let a_tag = row.querySelector("a");
  a_tag.onclick = callback;
}

function delete_book_from_list() {
  let abbr = this.parentNode;
  let td = abbr.parentNode;
  let row = td.parentNode;
  let get_isbn_number = td.previousElementSibling.textContent.trim();
  Store.delete_book_from_local_storage(get_isbn_number);

  row.remove();
  showsuccess("green", "Book Removed Successfully !", "red");
}

function showerror(removeclass, message, addclass) {
  display.classList.remove(removeclass);
  display.innerText = message;
  display.classList.add(addclass);
  setTimeout(function () {
    display.classList.remove("red");
    display.classList.add("white");
    display.innerText = "";
  }, 3000);
}

function showsuccess(addclass, message, removeclass) {
  display.classList.add(addclass);
  display.innerText = message;
  display.classList.remove(removeclass);
  setTimeout(function () {
    display.classList.remove("green");
    display.classList.add("white");
    display.innerText = "";
  }, 3000);
}

submitbutton.ondblclick = () => {
  const inputfield = document.createElement('input');
  inputfield.setAttribute('type', 'text');
  inputfield.value = submitbutton.value
  form.appendChild(inputfield)
  submitbutton.classList.add('submitbtn');
  inputfield.addEventListener('focusout', () => {
    submitbutton.classList.remove('submitbtn');
    submitbutton.value = inputfield.value;
    inputfield.classList.add('submitbtn');

  })

}

