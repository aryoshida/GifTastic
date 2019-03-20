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
                    if (results[i].rating !== "r"){
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<h3>").text("Rating: " + rating);
                        var fruitImage = $("<img data-state='still'>");

                        fruitImage.attr("data-animated-url",  results[i].images.fixed_height.url);
                        fruitImage.attr("data-still-url",  results[i].images.fixed_height_still.url);
                        fruitImage.attr("src", results[i].images.fixed_height_still.url);
                        gifDiv.append(p);
                        gifDiv.append(fruitImage);
                        $("#gifs-go-here").prepend(gifDiv);

                        fruitImage.on("click",function(){
                            if ($(this).attr("data-state") === "still"){
                                $(this).attr("data-state", "animated");
                                $(this).attr("src", $(this).attr("data-animated-url"));
                            } else {
                                $(this).attr("data-state", "still");
                                $(this).attr("src", $(this).attr("data-still-url"));
                            }
                        });

                    }
                }
            });
        });
    });
});