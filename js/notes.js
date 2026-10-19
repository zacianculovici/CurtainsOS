function saveNotes() {
    const notes = document.getElementById('notes-input').value;
    localStorage.setItem('notes', notes);
}

function loadNotes() {
    const notes = localStorage.getItem('notes');
    if (notes) {
        document.getElementById('notes-input').value = notes;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});
