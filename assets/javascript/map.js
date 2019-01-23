function initMap() {
  
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 38.8339,
      lng: -104.8214
    },
    zoom: 13
  });
 
    
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  console.log(input);
  var types = document.getElementById('type-selector');
  // possibly remove this var strictBounds
  // var strictBounds = document.getElementById('strict-bounds-selector');

  // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);


  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo('bounds', map);

  // Set the data fields to return when the user selects a place.
  autocomplete.setFields(
    ['address_components', 'geometry', 'name']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function () {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function () {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);

  // document.getElementById('use-strict-bounds')
  //   .addEventListener('click', function () {
  //     console.log('Checkbox clicked! New state=' + this.checked);
      autocomplete.setOptions({
        strictBounds: this.checked
      });
}

//-this is Giffy area-//
$(function () {

  $("button", ).on("click", function () {
      var type = $(this).attr("travel-place");
      $("#imageArea").empty();

      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=1UpFUCsNhpc1IK7JBMtLDBOu3OqZ7zPP&limit=5&g';
      console.log(queryURL);
      $.ajax({
              url: queryURL,
              method: 'GET'

          })

          .then(function (response) {

              console.log(response);
              var results = response.data;
              for (var i = 0; i < response.data.length; i++) {
                  var rating = response.data[i].rating;
                  console.log(rating);
                  var p = $('<p>').text('Rating:' + rating);
                  var gify = $("<div>");
                  var placeImage = $("<img>");
                  placeImage.attr("src", results[i].images.fixed_height.url);
                  gify.append(placeImage);
                  gify.prepend(p);
                  $("#imageArea").prepend(gify);
              }

          });
  });
});
$("#add-travel").on("click", function (event) {
  var search = $("#travel-input").val().trim();
  console.log(search);
  event.preventDefault();
  var a = $("<button>").html(search);
  a.addClass("btn btn-primary");
  a.val(search);
  $("#buttonArea").append(a);
  console.log(a);
  $(a).on("click", function (queryURL) {
      $("#imageArea").empty();

      var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=1UpFUCsNhpc1IK7JBMtLDBOu3OqZ7zPP&limit=5&g';

      console.log(queryURL);
      $.ajax({
              url: queryURL,
              method: 'GET'

          })
          .then(function (response) {

              console.log(response);
              var results = response.data;
              for (var i = 0; i < response.data.length; i++) {
                  var rating = response.data[i].rating;
                  console.log(rating);
                  var p = $('<p>').text('Rating:' + rating);
                  var gify = $("<div>");
                  var placeImage = $("<img>");
                  placeImage.attr("src", results[i].images.fixed_height.url);
                  gify.append(placeImage);
                  gify.prepend(p);
                  $("#imageArea").prepend(gify);

              }
          });

  });
});