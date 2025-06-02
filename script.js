
let books = JSON.parse(localStorage.getItem("books") || "[]");
let notes = localStorage.getItem("notes") || "";

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}
function saveNotes() {
  localStorage.setItem("notes", document.getElementById("notesArea").value);
}
function clearNotes() {
  if (confirm("Να διαγραφούν οι σημειώσεις;")) {
    document.getElementById("notesArea").value = "";
    saveNotes();
  }
}
function renderBooks(filter = 'all') {
  const list = document.getElementById("book-list");
  list.innerHTML = '';
  books
    .filter(book => filter === 'all' || book.category === filter)
    .forEach((book, index) => {
      const div = document.createElement("div");
      div.className = "book";
      div.onclick = () => div.classList.toggle("open");
      div.innerHTML = \`
        <div class="book-title">\${book.title}</div>
        <div class="book-details">
          <p><em>\${book.category}</em></p>
          <p>\${book.text}</p>
          <button onclick="deleteBook(\${index}); event.stopPropagation();">Διαγραφή</button>
        </div>
      \`;
      list.appendChild(div);
    });
}
function deleteBook(index) {
  if (confirm("Σίγουρα θέλεις να διαγράψεις αυτό το παραμύθι;")) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
  }
}
function filterCategory(category) {
  renderBooks(category);
}
function promptForPassword() {
  const password = prompt("Κωδικός πρόσβασης:");
  if (password === "1234") {
    const title = prompt("Τίτλος παραμυθιού:");
    const text = prompt("Κείμενο παραμυθιού:");
    const category = prompt("Κατηγορία (Κλασικά, Μαγικά, Αστεία):") || "Κλασικά";
    if (title && text) {
      books.push({ title, text, category });
      saveBooks();
      renderBooks();
    }
  } else {
    alert("Λάθος κωδικός.");
  }
}
window.onload = () => {
  renderBooks();
  document.getElementById("notesArea").value = notes;
  document.getElementById("notesArea").addEventListener("input", saveNotes);
};
