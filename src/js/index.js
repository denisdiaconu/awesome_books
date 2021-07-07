class Ls {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  getBookList() {
    this.getbooks = localStorage.getItem('BookList');
    return this.getbooks;
  }

  getCount() {
    this.getcounter = localStorage.getItem('BookCount');
    return this.getcounter;
  }

  updateBooklist(list) {
    this.allBooks = localStorage.setItem('BookList', list);
    return this.allBooks;
  }

  updateCount(count) {
    this.setCounter = localStorage.setItem('BookCount', count);
    return this.setCounter;
  }

  setls() {
    this.count = 0;
    if (!localStorage.getItem('BookList')) {
      localStorage.setItem('BookList', '[]');
    }
    if (!localStorage.getItem('BookCount')) {
      localStorage.setItem('BookCount', this.count);
    }
    this.displayAllBooks();
  }

  displayAllBooks() {
    const list = JSON.parse(this.getBookList());
    const len = list.length;
    if (len > 0) {
      list.forEach((book) => this.addtodom(book));
    }
  }

  addBook(bookObj) {
    const list = JSON.parse(this.getBookList());
    let newCount = Number(this.getCount());
    list.push(bookObj);
    this.updateBooklist(JSON.stringify(list));
    this.updateCount(newCount += 1);
  }

  removeBook(id) {
    const books = JSON.parse(this.getBookList());
    const newBooks = books.filter((e) => e.id.toString() !== id.toString());
    this.updateBooklist(JSON.stringify(newBooks));
  }

  getBookInputs() {
    this.counter = this.getCount();
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const newBook = new Ls(this.counter, title.value, author.value);
    title.value = '';
    author.value = '';
    return newBook;
  }

  addtodom(obj) {
    this.storageList = document.getElementById('storage_list');
    const li = document.createElement('li');
    li.innerHTML = `
          <div id='${obj.id}'>
          <div class="title_container"><h1>${obj.title}</h1>
          <p>:</p>
          <p>by ${obj.author}</p></div>
          <div class="btn_container"><button class="btn" id="${obj.id}">Remove</button></div>
          </div>`;
    this.storageList.appendChild(li);
    this.addEvent();
  }

  addEvent() {
    this.buttons = document.querySelectorAll('.btn');
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.removeBook(e.target.id);
        e.target.parentElement.parentElement.remove();
      });
    });
  }
}
const database = new Ls();
database.setls();
const btn = document.getElementById('btn');
btn.onclick = () => {
  const newBook = database.getBookInputs();
  database.addBook(newBook);
  database.addtodom(newBook);
};