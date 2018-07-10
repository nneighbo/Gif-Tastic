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
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&api_key=jJsOFqs9lXGOp4AI08ehiRofan7u25g7";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $("#gif-view").empty();
      for (i = 0; i < response.data.length; i++){
      $("#gif-view").append("<h6>" + "Rated: " + response.data[i].rating.toUpperCase() + "</h6>");
      var newImage = $("<img>").attr("src", response.data[i].url);
      console.log(response.data[i].url);
      $("#gif-view").append(newImage);
      }
    });
  });
  
  