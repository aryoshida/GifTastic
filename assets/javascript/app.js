$(document).ready(function(){
    var fruitButtons = $(".fruit-button")
    fruitButtons.each(function(){

        $(this).on("click", function(){
            var fruit = $(this).attr("data-fruit");

            const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            fruit + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }) .then(function(response){
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++){
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Ratting: " + rating);
                        var fruitImage = $("<img>");
                        fruitImage.attr("src", results[i].images.fixed_height.url);
                        gifDiv.append(p);
                        gifDiv.append(fruitImage);
                        $("#gifs-go-here").prepend(gifDiv);
                    }
                }

            });
        });


    });



});