var RETURN_KEY = 13;  // Return key

// Handles all mouse clicks.
// TODO: Allow use of keyboard selection for accessibility.
document.addEventListener('click', function(event) {
  // Ignore clicks directly on inputs.
  if (event.target.tagName == 'INPUT') {
    return;
  }

  // Select whatever note was clicked.
  var selectedNote = event.target.closest(".note-container");
  if (selectedNote) {
    var noteID = selectedNote.id;
    var note = _.find(notes, {id: parseInt(noteID)});
    selectNote(note);
  } else {
    deselectAllNotes();
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode == RETURN_KEY && event.target.tagName == 'INPUT') {
    deselectAllNotes();
  }
});
