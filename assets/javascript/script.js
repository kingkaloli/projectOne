$(function(){

    $("button", ).on("click", function () {
        var type = $(this).attr("travel-place");
        $("#imageArea").empty();

        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=1UpFUCsNhpc1IK7JBMtLDBOu3OqZ7zPP&limit=2&g';
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
    a.addClass("btn btn-secondary");
    a.val(search);
    $("#buttonArea").append(a);
    console.log(a);
    $(a).on("click", function (queryURL) {
        $("#imageArea").empty();

        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=1UpFUCsNhpc1IK7JBMtLDBOu3OqZ7zPP&limit=2&g';

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