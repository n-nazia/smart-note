let notes = JSON.parse(localStorage.getItem("smartNotes")) || [];

// Word count + auto title
document.getElementById("content").addEventListener("input", () => {
  let text = document.getElementById("content").value;

  let count = text.trim() ? text.trim().split(/\s+/).length : 0;
  document.getElementById("wordCount").innerText = "Words: " + count;

  if (!document.getElementById("title").value && text) {
    document.getElementById("title").value =
      text.split(" ").slice(0, 4).join(" ");
  }
});

// Add note
function addNote() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if (!content) {
    alert("Please write a note");
    return;
  }

  notes.push({ title, content });
  localStorage.setItem("smartNotes", JSON.stringify(notes));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("wordCount").innerText = "Words: 0";

  displayNotes();
}

// Display notes
function displayNotes() {
  let notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  notes.forEach((note, index) => {
    notesDiv.innerHTML += `
      <div class="note">
        <strong>${note.title || "Untitled"}</strong>
        <button class="delete" onclick="deleteNote(${index})">X</button>
        <p>${note.content}</p>
      </div>
    `;
  });
}

// Delete note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("smartNotes", JSON.stringify(notes));
  displayNotes();
}

// Search notes
function searchNotes() {
  let query = document.getElementById("search").value.toLowerCase();
  let filtered = notes.filter(note =>
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query)
  );

  let notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";

  filtered.forEach(note => {
    notesDiv.innerHTML += `
      <div class="note">
        <strong>${note.title || "Untitled"}</strong>
        <p>${note.content}</p>
      </div>
    `;
  });
}

// Load on start
displayNotes();
