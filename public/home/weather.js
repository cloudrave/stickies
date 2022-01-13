// OMG it's so secret!!!  Definitely not stored in a public page or anything. ;)
var WEATHER_KEY = '927ef3fff0c54f04eb10a5ff1c7ca29f';

function getLocationCoords(success, error) {
  if ('geolocation' in navigator) {
    return navigator.geolocation.getCurrentPosition(function(position) {
      success(position.coords);
    }, function(err) {
      error(err.message);
    });
  } else {
    error("Lacking Geolocation capability");
  }
}

function getWeatherAt(coords, success, error) {
  var lat = coords.latitude;
  var lon = coords.longitude;
  $.get('http://api.openweathermap.org/data/2.5/weather', {
    lat: lat,
    lon: lon,
    appid: WEATHER_KEY,
    units: 'imperial'
  }).done(function(data) {
    success(data);
  }).fail(error);
}

function getMyWeatherString(success, error) {
  getLocationCoords(function(coords) {
    console.log('Location:', coords);
    getWeatherAt(coords, function(weather) {
      console.log('Weather:', weather);
      var text = '';
      text += 'Weather in ' + weather.name + ': ';
      text += weather.weather[0].description + ' ';
      text += '(' + weather.weather[0].main + ') ';
      text += '-- ' + weather.main.temp + 'F';
      success(text);
    }, error);
  }, error);
}
