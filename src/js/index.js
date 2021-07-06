class ls {
  setBooksList() {
      if(!localStorage.getItem('BookList')){
          localStorage.setItem('BookList', '[]')
      }
  }
  setBookCount() {
      if(!localStorage.getItem('BookCount')){
          localStorage.setItem('BookCount', 0)
      }
  }
  setls(){
      this.setBooksList();
      this.setBookCount();
  }
  getBookList() {return localStorage.getItem('BookList')}
  getCount() {return localStorage.getItem('BookCount')}
  updateBooklist(list) {return localStorage.setItem('BookList', list)}
  updateCount(count) {return localStorage.setItem('BookCount', count)}
  addBook(bookObj) {
      const list = JSON.parse(this.getBookList());
      let count = this.getCount();
      count += 1;
      list.push(bookObj);
      this.updateBooklist(list);
      this.updateCount(count);
  }
}
class Book {
  constructor(id , title, author){
      this.id = id;
      this.title = title;
      this.author = author;
  }
}
const database = new ls();
database.setls();
let counter = database.getCount();
const dom = () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const newBook = new Book(counter, title.value, author.value);
  title.value = '';
  author.value = '';
  return newBook;
}
const btn = document.getElementById('btn');
const storageList = document.getElementById('storage_list');
const removebook = (id) => {
  const books = JSON.parse(database.getBookList());
  const newBooks = books.filter((e) => e.id.toString() !== id.toString());
  database.updateBooklist(JSON.stringify(newBooks));
};
const addEvent = () => {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      removebook(e.target.id);
      e.target.parentElement.parentElement.remove()
    });
  });
}
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
}
btn.onclick = () => {
  const newBook = dom();
  const allbooks =  JSON.parse(database.getBookList());
  allbooks.push(newBook);
  counter = parseInt(counter);
  database.updateCount(counter += 1);
  database.updateBooklist(JSON.stringify(allbooks));
  addtodom(newBook);
};