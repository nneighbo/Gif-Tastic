// http://api.giphy.com/v1/gifs/search?q=ryan+gosling&limit=5&api_key=jJsOFqs9lXGOp4AI08ehiRofan7u25g7
var animals = ["dog", "cat", "hedgehog", "bird",];
var queryURL;

function renderButtons(){
    $("#gif-buttons").empty();

    for (i = 0; i < animals.length; i++){
    var newButton =  $("#gif-buttons").append("<button class='btn'>" + animals[i] +"</button>");
    }
} 

renderButtons();

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var newGif = $("#gif-input").val();
    animals.push(newGif);
    renderButtons();
  });

  $(document).on("click", ".btn", function(){
    gif = $(this).text();
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=jJsOFqs9lXGOp4AI08ehiRofan7u25g7";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#gif-view").empty();
      for (i = 0; i < response.data.length; i++){
        var gifDiv = $("<div class='col-lg-3'>");
        var p =("<p>" + "Rated: " + response.data[i].rating.toUpperCase() + "</p>");
        var newImage = $("<img>");
        var movingImage = response.data[i].images.fixed_height.url;
        var stillImage = response.data[i].images.fixed_height_still.url;
        newImage.attr("src", stillImage);
        newImage.attr("alt", "gif");
        newImage.attr("data-animate", movingImage);
        newImage.attr("data-still", stillImage);
        gifDiv.prepend(p);
        gifDiv.prepend(newImage);
        $("#gif-view").prepend(gifDiv);
      }

      $(newImage).on("click", function(){
        let state = $(this).attr("data-state");
        if(state === "still"){
          $(this).attr("src", $(this).attr("data-animate"))
          $(this).attr("data-state", "animate")
          console.log(this)
        } else {
          $(this).attr("src", $(this).attr("data-still"))
          $(this).attr("data-state", "still");
        }
      });

    });
  });
  
  