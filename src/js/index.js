const title = document.getElementById("title");
const author = document.getElementById("author");
const btn = document.getElementById("btn");
const storage_list = document.getElementById("storage_list");
if(!localStorage.getItem('count')) {
    localStorage.setItem('count', 0);
};
if (!localStorage.getItem('books')) {
    localStorage.setItem('books', JSON.stringify([]));
};
btn.onclick = () => {
    const books = JSON.parse(localStorage.getItem("books"))
    let counter = JSON.parse(localStorage.getItem("count"))
    book = {
        id: counter += 1,
        title: title.value,
        author: author.value
    }
    books.push(book);
    localStorage.setItem('count', counter);
    localStorage.setItem('books', JSON.stringify(books));
    location.reload();
};
const remove = (id) => {
    const books = JSON.parse(localStorage.getItem("books"));
    const newBooks = books.filter((e) => e.id.toString() !== id.toString());
    localStorage.setItem('books', JSON.stringify(newBooks));
    location.reload();
};
const list = JSON.parse(localStorage.getItem('books'));
const listLin = list.length;
for (let i = 0; i < listLin; i += 1) {
    const li = document.createElement("li")
    li.innerHTML =`
    <div id='${list[i].id}'>
    <h1>${list[i].title}</h1>
    <p>${list[i].author}</p>
    <button onclick="remove(${list[i].id})">Remove</button>
    </div>`;
    storage_list.appendChild(li);
}