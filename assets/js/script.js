var map1, map2, map3;
var service;
var userLat;
var userLong;
let userLocation;

function initMap() {
  var city = new google.maps.LatLng(35.6448,-120.6935);

  map1 = new google.maps.Map(document.getElementById('map1'), {
      center: city,
      zoom: 18
    });
  
  map2 = new google.maps.Map(document.getElementById('map2'), {
      center: city,
      zoom: 18
    });

  map3 = new google.maps.Map(document.getElementById('map3'), {
      center: city,
      zoom: 18
    });

  var request = {
    location: city,
    radius: '50',
    query: 'hiking trail'
  };

  service = new google.maps.places.PlacesService(map1);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 1; i < 4; i++) {
      console.log(results[i]);
      $("<p>Rating: " + results[i-1].rating + " stars</p>").insertAfter("#map" + i);
      $("<p>Distance: " + (i + .3) + "miles</p>").insertAfter("#map" + i);
      $("<h2>" + results[i-1].name + "</h2>").insertAfter("#map" + i);
    }

    map1.setCenter(results[0].geometry.location);
    map2.setCenter(results[1].geometry.location);
    map3.setCenter(results[2].geometry.location);
  }
}

$("#target").submit(function(e) {
  e.preventDefault();

  userLocation = $("#location").val();

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': userLocation}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      userLat = results[0].geometry.location.lat();
      userLong = results[0].geometry.location.lng();
    } else {
      alert("something went wrong " + status);
    }
  });
});