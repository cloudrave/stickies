const NOTE_COLORS = ['green', 'yellow', 'blue', 'red'];

var notes = DataManager.data.notes;

// Returns note color based on note's ID.
var lookupNoteColor = function(id) {
  var colorIndex = id % NOTE_COLORS.length;
  return NOTE_COLORS[colorIndex];
};

// Updates the note to reflect that it is deselected.
var deselectNote = function(note) {
  if (!note.isSelected) {
    // Note already deselected.
    return;
  }
  note.isSelected = false;
  refreshNoteDisplay();
};

var deselectAllNotes = function() {
  _.each(notes, deselectNote);
};

// Selects the passed note.
var selectNote = function(note) {
  if (!note || note.isSelected) {
    // Note already selected or non-existing, so do nothing.
    return;
  }
  deselectAllNotes();
  // Updates the data model to reflect the note's selected status.
  note.isSelected = true;

  // TODO: Place cursor in note input field automatically.
  // Note: This won't work unless we make it a callback of refreshNoteDisplay()
  // $('.note-container#' + note.id).find('input.note-input').first().select();

  refreshNoteDisplay();
};

// Returns HTML for a note.  This is part of the note-creating process.
var makeNoteInnerHTML = function(text) {
  return "<div class='note-check'>" +
    "<input type='checkbox' />" +
    "</div>" +
    "<label>"+text+"</label>";
};

// Creates a new note object from scratch, using some sensible defaults.
var makeNewNoteObject = function() {
  var noteID = DataManager.data.nextNoteID;
  var note = {
    id: noteID,
    isSelected: false,
    label: "",
    isChecked: false,
    color: lookupNoteColor(noteID)
  };
  DataManager.data.nextNoteID += 1;
  return note;
};

// Adds a note and updates the display.
// Options are to set the initial text and selection status of the note.
var addNote = function(options) {
  options = options || {};
  _.defaults(options, {
    label: "",
    selectNoteAfterwards: true
  });

  var note = makeNewNoteObject();
  note.label = options.label;
  notes.push(note);

  if (options.selectNoteAfterwards) {
    selectNote(note);
  }
  refreshNoteDisplay();
  return note;
};

// Removes the note from the note workspace after confirming user's intention to delete the note.
var deleteNote = function(noteID) {
  var savedAnimal = _.sample(["giraffes", "hippos", "puppies", "gerbils"]);
  var n = _.random(200, 999);
  var isConfirmed = confirm("ARE YOU SERIOUS? That sticky note could probably save " + n + " endangered " +
    savedAnimal + "!");
  if (isConfirmed) {
    _.remove(notes, {id: noteID});
    refreshNoteDisplay();
  }
};

// Updates the note's data model to reflect the checkbox's status in the DOM.
var setNoteCheckedStatus = function(noteID, checkboxTarget) {
  var note = _.find(notes, {id: noteID});
  note.isChecked = $(checkboxTarget).prop('checked');
  DataManager.saveData();
};

var setNoteLabel = function(noteID, inputTarget) {
  var note = _.find(notes, {id: noteID});
  note.label = $(inputTarget).val();
  DataManager.saveData();
};

function addWeatherNote() {
  var note = addNote({
    label: "Loading weather...",
    selectNoteAfterwards: false
  });
  getMyWeatherString(function(str) {
    note.label = str;
    refreshNoteDisplay();
  }, function(error) {
    alert(error);
  });
  return note;
}
