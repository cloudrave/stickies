// Renders a note as HTML, given a single note object.  Does not update the DOM.
// This method takes into account the note's state.  For example, if the note is
// selected, then this is reflected in the HTML.
var getNoteHTML = function(note) {
  var html = "";
  html += "<div id='" + note.id + "' class='note-container note-" + note.color + " " +
    (note.isSelected ? "note-selected" : "") + "'>";
  html += "<div class='note-check'>";
  // Passing `this` when calling setNoteCheckedStatus gives us easier access to the checkbox value.
  html += "<input type='checkbox' onchange='setNoteCheckedStatus(" + note.id + ", this)' " + (note.isChecked ? "checked='checked'" : "") + " />";
  html += "</div>";
  if (note.isSelected) {
    // Input to edit note label
    // Passing `this` when calling setNoteLabel gives us easier access to the input.
    // FIXME: This can succumb to attacks like `' autofocus onfocus='alert(1)`
    html += "<input type='text' onkeyup='setNoteLabel(" + note.id + ", this)' class='note-input' value='" + note.label + "'>";
    // Delete button to delete note
    var deleteThisNote = function() {
      deleteNote(note);
    };
    html += "<button class='delete btn btn-danger btn-xs' onclick='deleteNote(" + note.id + ")'>Delete</button>";
  } else {
    html += "<label>" + note.label + "</label>";
  }
  html += "</div>";
  return html;
};

// Renders an array of notes as HTML.  Does not update the DOM.
var getNotesHTML = function(notes) {
  var html = "";
  for (var i = 0; i < notes.length; i++) {
    html += getNoteHTML(notes[i]);
  }
  return html;
};

// Updates the DOM with HTML that reflects the current state of the notes objects.
// Uses debouncing of 10ms so that not too many DOM renders take place at once.
var refreshNoteDisplay = _.debounce(function() {
  $('.note-workspace').html(getNotesHTML(DataManager.data.notes));

  // TODO: Think of a nicer way to save data than just waiting for a refresh.
  DataManager.saveData();
}, 10);

// Refresh the note display immediately when the DOM is ready.
$(function() {
  refreshNoteDisplay();
});
