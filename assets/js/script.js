var map1, map2, map3;
var service;

function initMap() {
  var initLoc = new google.maps.LatLng(37.4221,-122.0841);

  map1 = new google.maps.Map(document.getElementById('map1'), {
      center: initLoc,
      zoom: 18
    });
  
  map2 = new google.maps.Map(document.getElementById('map2'), {
      center: initLoc,
      zoom: 18,
    });

  map3 = new google.maps.Map(document.getElementById('map3'), {
      center: initLoc,
      zoom: 18
    });

  service = new google.maps.places.PlacesService(map1);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 1; i < 4; i++) {
      $("<p>Rating: " + results[i-1].rating + " stars</p>").insertAfter("#map" + i);
      $("<p>Distance: " + (i + .3) + "miles</p>").insertAfter("#map" + i);
      $("<h2>" + results[i-1].name + "</h2>").insertAfter("#map" + i);
    }

    map1.setCenter(results[0].geometry.location);
    map2.setCenter(results[1].geometry.location);
    map3.setCenter(results[2].geometry.location);
  }
}

function changeMap(lat, long) {
  var userLoc = new google.maps.LatLng(lat, long);

  var request = {
    location: userLoc,
    radius: "50",
    query: 'hiking trail'
  };

  service.textSearch(request, callback);
}

$("#target").submit(function(e) {
  e.preventDefault();

  let userLocation = $("#location").val();

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': userLocation}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      var userLat = results[0].geometry.location.lat();
      var userLong = results[0].geometry.location.lng();
      changeMap(userLat, userLong);
      getWeatherInfo(userLat, userLong)
    } else {
      alert("something went wrong " + status);
    }
  });

  $(".trailSuggestionContainer").removeClass("opacity-0");
  $(".trailSuggestionContainer").addClass("opacity-100");
});


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
        //making sure the request to server is valid
          alert("Unable to Connect to Server");
      });
};

// creating a list of trail forecast

var displayTrailForecast = function(weatherData) {

  // getting the current date
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  
    // creating the elements within


    // run for loop to create elements for all 5 days of forecast
    for (var i = 0; i <= 4; i++) {
        var temp = weatherData.daily[i].temp.day;
        var descript = weatherData.daily[i].weather[0].description;
        var wind = weatherData.daily[i].wind_speed;
        var humid = weatherData.daily[i].humidity;
        var uvi = weatherData.daily[i].uvi;

        // creating elements
        var containerEl = document.createElement("div");
        containerEl.classList = "weatherCard shadow-xl rounded-lg p-5";
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



        weatherForecastEl.appendChild(containerEl);
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


var weatherForecastEl = document.querySelector(".weatherForecastContainer");
