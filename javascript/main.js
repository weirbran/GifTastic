$(document).ready(function () {

  //array of topics that are going to become buttons

  var topics = ["Game of Thrones", "Stranger Things", "The Handmaid's Tale", "Westworld", "Orphan Black", "This Is Us", "The Crown", "American Ninja Warrior", "Rupauls Drag Race", "The Amazing Race"];



  //loop that dynamically creates buttons with elements of above array 
  function createButtons() {
    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++) {

      $(".buttons").append("<button class='btn btn-primary m-2' " + "data-show='" + topics[i] + "'>" + topics[i] + "</button>");

    }
  };

  createButtons();

  //when user clicks button, reqeust sent to GIPHY API for that specific search term  
  $("button").on("click", function () {

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

      //10 images and their respective ratings created on the page 
      for (var i = 0; i < results.length; i++) {

        var gifDiv = $("<div>");

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

  $("#submit").on("click", function (event) {

    event.preventDefault();

    // Get the to-do "value" from the textbox and store it a variable
    //.trim() removes the spaces from the beginning and the end of the string; makes things 'neater'
    var userInput = $("input").val().trim();
    $("input").val("");

    topics.push(userInput);


    createButtons();

  });

});



