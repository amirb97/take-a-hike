

var getWeatherInfo = function(lat, lon) {
  // TODO: fetching weather data from open weather api 
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=68d2b3cf227fcf834cc103a03ea64251"

  // request the url 
      fetch(apiUrl).then(function(response) {
          // request successful
          if (response.ok) {
              //console.log(response.json())
              response.json().then(function(object) {
                 displayTrailForecast(object);
              });
          }else{
              alert("Error: trail location not found.");
          }
      })
      .catch(function(error) {
          alert("Unable to Connect to Server");
      });
};

// creating a list of trail forecast

var displayTrailForecast = function(weatherData) {

  console.log(weatherData);
  // getting the current date
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  
    // creating the elements within

    var forecastContainEl = document.createElement("div");
    forecastContainEl.classList = "weatherForecastContainer flex justify-around";
    weatherForecastEl.appendChild(forecastContainEl);
    // run for loop to create elements for all 5 days of forecast
    for (var i = 0; i <= 4; i++) {
        var temp = weatherData.daily[i].temp.day;
        var descript = weatherData.daily[i].weather[0].description;
        var wind = weatherData.daily[i].wind_speed;
        var humid = weatherData.daily[i].humidity;
        var uvi = weatherData.daily[i].uvi;

        // creating elements
        var containerEl = document.createElement("div");
        containerEl.classList = "card shadow-xl rounded-lg p-4 ";
        var titleEl = document.createElement("h5");
        titleEl.textContent = today;

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + temp + " F";
        var descriptEl = document.createElement("p");
        descriptEl.textContent = descript;
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + wind + " MPH";
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + humid + " %";
        var uviEl = document.createElement("p");
        uviEl.textContent = "UV Index: " + uvi;



        forecastContainEl.appendChild(containerEl);
        containerEl.appendChild(titleEl);
        containerEl.appendChild(tempEl);
        containerEl.appendChild(descriptEl);
        containerEl.appendChild(windEl);
        containerEl.appendChild(humidEl);
        containerEl.appendChild(uviEl);

    // adding a day to the original date
       dd++;
       today = mm + '/' + dd + '/' + yyyy;
    }
};

// handling the "submit"
var geoCoordinateHandler = function(lat, lon) {

  // get value from map element
  var lat = 32.7157//latObject.value.trim();
  var lon = 117.1611//lonObject.value.trim();
  if (lat && lon) {
      getWeatherInfo(lat, lon);
  } else {
      alert("No such city exist.");
  }
  console.log(lat, lon);
}

geoCoordinateHandler();
var weatherForecastEl = document.querySelector(".weatherForecastContainer");