document.addEventListener('DOMContentLoaded', function() {
    const notesContainer = document.getElementById('notesContainer');
    const noteForm = document.getElementById('noteForm');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteTags = document.getElementById('noteTags');
    const noteColor = document.getElementById('noteColor');
    const notePinned = document.getElementById('notePinned');
    const searchInput = document.getElementById('searchInput');

    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        return notes;
    }

    function displayNotes(notes) {
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note' + (note.pinned ? ' pinned' : '');
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                <h2 class="note-title">${note.title}</h2>
                <p class="note-content">${note.content}</p>
                <p class="note-tags">Tagi: ${note.tags.join(', ')}</p>
                <div class="note-footer">
                    <button class="edit-btn" onclick="editNote(${index})">Edytuj</button>
                    <button class="delete-btn" onclick="deleteNote(${index})">Usuń</button>
                </div>
            `;
            notesContainer.appendChild(noteElement);
        });
    }

    function addNote() {
        const notes = loadNotes();
        const newNote = {
            title: noteTitle.value,
            content: noteContent.value,
            tags: noteTags.value.split(',').map(tag => tag.trim()),
            color: noteColor.value,
            pinned: notePinned.checked,
            created: new Date().toISOString()
        };
        notes.unshift(newNote);
        saveNotes(notes);
        displayNotes(notes);
        noteForm.reset();
    }

    function deleteNote(index) {
        const notes = loadNotes();
        notes.splice(index, 1);
        saveNotes(notes);
        displayNotes(notes);
    }

    function editNote(index) {
        const notes = loadNotes();
        const note = notes[index];
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteTags.value = note.tags.join(', ');
        noteColor.value = note.color;
        notePinned.checked = note.pinned;
        notes.splice(index, 1);
        saveNotes(notes);
        displayNotes(notes);
    }

    function searchNotes() {
        const searchText = searchInput.value.toLowerCase();
        const notes = loadNotes();
        const filteredNotes = notes.filter(note => {
            return note.title.toLowerCase().includes(searchText) ||
                   note.content.toLowerCase().includes(searchText) ||
                   note.tags.some(tag => tag.toLowerCase().includes(searchText));
        });
        displayNotes(filteredNotes);
    }

    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNote();
    });

    searchInput.addEventListener('input', searchNotes);

    displayNotes(loadNotes());
});
