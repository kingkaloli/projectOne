

$("#addplaceBtn").on("click",function(){
  var searchMap = $("#mapInput").val().trim();
  
  console.log(searchMap);
  return false;
})
<script src="https://apis.google.com/js/api.js" type="text/javascript"></script>
<script type="text/javascript">
  gapi.load('auth2', function() {
    // Library loaded.
  });
</script>

var queryURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAgKXioFMPZh0wujY_Mn3F6To_KpMlYd2c&callback=initMap"

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

function myMap() {
  var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("map"),mapProp);
  }
  
  