// Calling google map API

// var queryURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgKXioFMPZh0wujY_Mn3F6To_KpMlYd2c&callback=initMap"

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("map"),mapProp);
  }