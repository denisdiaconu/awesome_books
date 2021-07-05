const title = document.getElementById("title");
const author = document.getElementById("author");
const btn = document.getElementById("btn");
const storage_list = document.getElementById("storage_list");

btn.onclick = function() {
    const key = title.value;
    const value = author.value;

    if (key && value) {
        localStorage.setItem(key, value);
        location.reload();
    };
};

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    storage_list.append(key, value);
};

