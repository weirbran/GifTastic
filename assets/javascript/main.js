$(document).ready(function () {

  //array of topics that are to become buttons

  var topics = ["Game of Thrones", "Stranger Things", "The Handmaid's Tale", "Westworld", "Orphan Black", "This Is Us", "The Crown", "American Ninja Warrior", "Rupauls Drag Race", "The Amazing Race"];

  //when user clicks button, request sent to GIPHY API for that specific search term  
  $(document.body).on("click", ".btn", function () {

    $("#gifs-appear-here").empty();

    var searchTerm = $(this).attr("data-show");

    var limit = 10;

    var apiKey = "api_key=sv15d5YfSizgU0ZsRKgeIioehoepDWVz";

    var url = "https://api.giphy.com/v1/gifs/search?" + apiKey + "&q=" + searchTerm + "&limit=" + limit + "&offset=0&lang=en";

    $.ajax({
      url: url,
      method: 'GET'
    }).then(function (response) {
      console.log(response);

      var results = response.data;

      //10 gifs and their respective ratings displayed on the page 
      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");
        gifDiv.attr("id", "image-container");
        gifDiv.append("<p>Rating: " + results[i].rating + "</p>");

        var gifImage = $("<img>");
        gifImage.attr("data-state", "still");
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("class", "gif");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifDiv.append(gifImage);

        $("#gifs-appear-here").append(gifDiv);

      }

    })

  })

  //function that dynamically creates buttons with elements of above array 
  function createButtons() {

    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++) {

      $(".buttons").append("<button class='btn btn-primary m-2' " + "data-show='" + topics[i] + "'>" + topics[i] + "</button>");

    }
  };

  //when user clicks a gif, it toggles between still and animated 
  $(document.body).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  });

  //when user clicks on submit, their input is turned into a button 
  $("#submit").on("click", function (event) {

    var userInput = $("input").val().trim();
    $("input").val("");

    topics.push(userInput);

    createButtons();

    return false;

  });

  createButtons();

});



