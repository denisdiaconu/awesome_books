class Ls {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  setls() {
    this.count = 0;
    if (!localStorage.getItem('BookList')) {
      localStorage.setItem('BookList', '[]');
    }
    if (!localStorage.getItem('BookCount')) {
      localStorage.setItem('BookCount', this.count);
    }
  }

  addBook(bookObj) {
    const list = JSON.parse(this.getBookList());
    let count = this.getCount();
    count += 1;
    list.push(bookObj);
    this.updateBooklist(list);
    this.updateCount(count);
  }
}
const database = new Ls();
database.setls();
const getBookList = () => localStorage.getItem('BookList');
const getCount = () => localStorage.getItem('BookCount');
const updateBooklist = (list) => localStorage.setItem('BookList', list);
const updateCount = (count) => localStorage.setItem('BookCount', count);
let counter = getCount();
const dom = () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const newBook = new Ls(counter, title.value, author.value);
  title.value = '';
  author.value = '';
  return newBook;
};
const btn = document.getElementById('btn');
const storageList = document.getElementById('storage_list');
const removebook = (id) => {
  const books = JSON.parse(getBookList());
  const newBooks = books.filter((e) => e.id.toString() !== id.toString());
  updateBooklist(JSON.stringify(newBooks));
};
const addEvent = () => {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      removebook(e.target.id);
      e.target.parentElement.parentElement.remove();
    });
  });
};
const addtodom = (obj) => {
  const li = document.createElement('li');
  li.innerHTML = `
      <div id='${obj.id}'>
      <h1>${obj.title}</h1>
      <p>${obj.author}</p>
      <button class="btn" id="${obj.id}">Remove</button>
      </div>`;
  storageList.appendChild(li);
  addEvent();
};
btn.onclick = () => {
  const newBook = dom();
  const allbooks = JSON.parse(getBookList());
  allbooks.push(newBook);
  counter = Number(counter);
  updateCount(counter += 1);
  updateBooklist(JSON.stringify(allbooks));
  addtodom(newBook);
};
