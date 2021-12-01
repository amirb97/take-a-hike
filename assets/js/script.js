var trailName = [];


var getWeatherInfo = function(lat, lon) {
  // TODO: fetching weather data from open weather api 
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat + "&lon=" + lon + "&units=imperial&appid=68d2b3cf227fcf834cc103a03ea64251"

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


  // getting the current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

    // creating the elements within
    var dailyTitleEl = document.createElement("h4");
    dailyTitleEl.textContent = "Popular trails' current weather: ";
    weatherForecastEl.appendChild(dailyTitleEl);
    var forecastContainEl = document.createElement("div");
    forecastContainEl.classList = " d-flex flex-row mx-auto flex-wrap";
    weatherForecastEl.appendChild(forecastContainEl);
    // run for loop to create elements for all 5 days of forecast
    for (var i = 0; i <= 4; i++) {
        var temp = weatherData.daily[i].temp.day;
        var wind = weatherData.daily[i].wind_speed;
        var humid = weatherData.daily[i].humidity;
        
        // creating elements
        var containerEl = document.createElement("div");
        containerEl.classList = "";
        var titleEl = document.createElement("h5");
        titleEl.textContent = trailName[i];

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temp: " + temp + " F";
        var windEl = document.createElement("p");
        windEl.textContent = "Wind: " + wind + " MPH";
        var humidEl = document.createElement("p");
        humidEl.textContent = "Humidity: " + humid + " %";

        forecastContainEl.appendChild(containerEl);
        containerEl.appendChild(titleEl);
        containerEl.appendChild(tempEl);
        containerEl.appendChild(windEl);
        containerEl.appendChild(humidEl);
    }
};

// handling the "submit"
var formSubmitHandler = function(weather) {
  weather.preventDefault();

  // get value from input element
  var trailName = cityInputEl.value.trim();
  if (trailName) {
      getWeatherInfo(trailName);
      cityInputEl.value = "";
  } else {
      alert("No such city exist.");
  }
  console.log(weather);
}

getWeatherInfo();

var weatherForecastEl = document.querySelector(".weatherForecastContainer")