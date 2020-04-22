// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function initMap(lat, lng) {
  var myCoords = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    center: myCoords,
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var marker = new google.maps.Marker({
    position: myCoords,
    map: map
  });
}


function initMap2(lat1, lng1, lat2, lng2) {
  var ltlng = [];

  ltlng.push(new google.maps.LatLng(lat1, lng1));
  ltlng.push(new google.maps.LatLng(lat2, lng2));


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: { lat: (lat1 + lat2) / 2, lng: (lng1 + lng2) / 2 }
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });
  for (var i = 0; i < ltlng.length; i++) {
    var marker = new google.maps.Marker
      (
        {
          position: ltlng[i],
          map: map
        }
      );
  }
  calculateAndDisplayRoute(directionsService, directionsRenderer, lat1, lng1, lat2, lng2);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, lat1, lng1, lat2, lng2) {
  var selectedMode = document.getElementById('mode').value;
  directionsService.route({
    origin: { lat: lat1, lng: lng1 }, 
    destination: { lat: lat2, lng: lng2 },  
    travelMode: google.maps.TravelMode[selectedMode]
  }, function (response, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(response);
      document.getElementById('totalKM').innerHTML = response.routes[0].legs[0].distance.value/1000 + " km";
      document.getElementById('totalH').innerHTML = response.routes[0].legs[0].duration.value/60 + " min";
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
