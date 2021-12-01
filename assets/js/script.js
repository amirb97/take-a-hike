var map;
var service;

function initMap() {
  var city = new google.maps.LatLng(35.6448,-120.6935);

  map = new google.maps.Map(document.getElementById('map'), {
      center: city,
      zoom: 17
    });

  var request = {
    location: city,
    radius: '50',
    query: 'hiking trail'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
    }

    map.setCenter(results[0].geometry.location);
  }
}

$('#btn').click(function() {
  console.log("Clicked!");
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': 'los angeles'}, function(results, status) {
    if(status == google.maps.GeocoderStatus.OK) {
      alert('location : ' + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng());
    } else {
      alert("something went wrong " + status);
    }
  });
});