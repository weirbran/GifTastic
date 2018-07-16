var topics = ["Game of Thrones", "Stranger Things", "The Handmaid's Tale", "Westworld", "Orphan Black", "This Is Us", "The Crown", "American Ninja Warrior", "Rupauls Drag Race", "The Amazing Race"];

for (var i = 0; i < topics.length; i++) {

  $(".buttons").append("<button class='btn btn-primary m-2' " + "data-show='" + topics[i] + "'>" + topics[i] + "</button>");

}

$("button").on("click", function () {

  var searchTerm = $(this).attr("data-show");

  var apiKey = "api_key=sv15d5YfSizgU0ZsRKgeIioehoepDWVz";

  var url = "https://api.giphy.com/v1/gifs/search?" + apiKey + "&q=" + searchTerm + "&limit=10&offset=0&lang=en";

  $.ajax({
    url: url,
    method: 'GET'
  }).then(function (response) {
    console.log(response);

    var results = response.data;


    for (var i = 0; i < results.length; i++) {


      $("#gifs-appear-here").append("<p>Rating: " + results[i].rating + "</p>");


      var gifImage = $("<img>");

      gifImage.attr("data-state", 'still');
      gifImage.attr("src", results[i].images.fixed_height_still.url);


      $("#gifs-appear-here").append(gifImage);

    }

  })

  // $(".gif").on("click", function () {
  //   //   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  //   var state = $(this).attr("data-state");
  //   //   //the 'this' keyword points to the thing that we're pressing
  //   //   //'this' gets the data-state attribute from whatever it is that we press 
  //   //   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  //   //   // Then, set the image's data-state to animate
  //   //   // Else set src to the data-still value
  //   if (state === "still") {
  //     $(this).attr("data-state", 'animate');
  //     $(this).attr("src", results[i].images.fixed_height_small.url);
  //   } else {
  //     $(this).attr("data-state", 'still');
  //     $(this).attr("src", results[i].images.fixed_height_still.url);
  //   }

});


// $.ajax({
//   url: queryURL,
//   method: "GET"
// })
//   .then(function (response) {
//     var results = response.data;

//     for (var i = 0; i < results.length; i++) {
//       var gifDiv = $("<div class='item'>");

//       var rating = results[i].rating;

//       var p = $("<p>").text("Rating: " + rating);

//       var personImage = $("<img>");
//       personImage.attr("src", results[i].images.fixed_height.url);

//       gifDiv.prepend(p);
//       gifDiv.prepend(personImage);

//       $("#gifs-appear-here").prepend(gifDiv);
//     }




