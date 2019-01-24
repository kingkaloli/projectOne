
 
  function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.8339,
        lng: -104.821},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    $("#add-travel", ).on("click", function () {
      var places = searchBox.getPlaces();

      // Clear out the old markers.
      markers.forEach(function(marker) {
      marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };

  
//-this is Giffy area-//
  $("button").on("click", function () {
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


$("#add-travel").on("click", function (event) {
  var search = $("#travel-input").val().trim();
  console.log(search);
  event.preventDefault();
  var a = $("<button>").html(search);
  a.addClass("btn btn-secondary");
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
})
