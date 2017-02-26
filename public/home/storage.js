var LOCAL_STORAGE_DATA_KEY = 'appData';
var STARTING_NOTE_ID = 100;
var SAVE_EVERY = 2000;  // sets data to save every 2 seconds

function makeDataManager() {
  return {
    data: {},
    // Loads data from localStorage.
    loadData: function() {
      // Attempt to get user data from localStorage.
      var retrievedData = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
      if (!_.isNull(retrievedData)) {
        retrievedData = JSON.parse(retrievedData);
      } else {
        // Use default if no data exists.
        retrievedData = {
          nextNoteID: STARTING_NOTE_ID,
          notes: []
        };
      }
      this.data = retrievedData;
    },
    // Saves data to localStorage, throttling so there aren't too many saves in one period of time.
    saveData: _.debounce(function() {
      var dataAsString = JSON.stringify(this.data);
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, dataAsString);
    }, 100)
  };
}

var DataManager = makeDataManager();

// Load user's data from localStorage.
DataManager.loadData();

// TODO: Only save data when data has actually changed.
// Save data every 2 seconds in case some data has changed without calling a save.
setTimeout(function() {
  DataManager.saveData();
}, SAVE_EVERY);
