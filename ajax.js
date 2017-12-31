$(document).ready(function() {

    var shows = [
        "Rick and Morty", "Bob's Burgers", "Futurama", "Archer", "Metalocalypse", "Pokemon",
        "Sailor Moon", "Hey Arnold", "Rocket Power", "Rocko's Modern Life",
        "Tokyo Ghoul"
    ];

    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    $(document).on("click", ".show-button", function() {
        $("#shows").empty();
        $(".show-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=VHFPeQ5VzvjRRbIGNcy8nPR2i7UjQuEV&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function(response) {
                var showsDiv;
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    showsDiv = $("<div class=\"show-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var showsImage = $("<img>");
                    showsImage.attr("src", still);
                    showsImage.attr("data-still", still);
                    showsImage.attr("data-animate", animated);
                    showsImage.attr("data-state", "still");
                    showsImage.addClass("show-image");

                    showsDiv.append(p);
                    showsDiv.append(showsImage);

                    $("#shows").append(showsDiv);
                }
            });
    });

    $("img").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-show").on("click", function(event) {
        event.preventDefault();
        var newShow = $("input").eq(0).val();

        if (newShow.length > 2) {
            shows.push(newShow);
        }

        populateButtons(shows, "show-button", "#show-buttons");

    });

    populateButtons(shows, "show-button", "#show-buttons");
});