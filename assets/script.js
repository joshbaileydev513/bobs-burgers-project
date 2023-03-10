//Putting the bobs burger:burger of the day API url to a variable.
var bobApi = "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/";
//Putting the bobs burger:end credits sequence API url to a variable.
var endcreditsApi = "https://bobsburgers-api.herokuapp.com/endCreditsSequence/";
var imdbBaseUrl = "https://imdb-api.com/en/API/SeasonEpisodes/k_t49mvg28/tt1561755/";


$("select").formSelect();

//A click function to execute once the user presses the button with the id:go-button.
$("#go-button").click(function () {
    //Removes all the <h4> elements.
    $("h4").remove();
    //Removes all the <p> elements.
    $("p").remove();

    //Grabbing the season value that the user picks and putting it to a variable.
    var season = $("#dropdown1").val();
    //Grabbing the episode value that the user picks and putting it to a variable.
    var episode = $("#dropdown2").val();
    //Adding the burger of the day API url with the user picked variable.
    var burgerUrl = bobApi + "?season=" + season + "&episode=" + episode;
    //Adding the end credits sequence API url with the user picked variable.
    var creditsUrl = endcreditsApi + "?season=" + season + "&episode=" + episode;

    fetch(burgerUrl)
        .then(function (respone) {
            return respone.json();
        })
        .then(function (data) {
            //Adding a new <h4> element to the id:info.
            $("#info").append("<h4>Burger of the Day: </h4>");

            //A if statement to check that the array has at least one object.
            if (data.length >= 1) {
                //For loop that will loop through the array.
                for (var i = 0; i < data.length; i++) {
                    //Grabbing the name of the burger and putting it to a variable.
                    var burgerName = data[i].name;
                    ////Grabbing the price of the burger and putting it to a variable.
                    var burgerPrice = data[i].price;

                    //Adding the burger name to the html as a <h4>.
                    $("#info").append("<h4>Name: " + burgerName + "</h4>");

                    //Adding the price of the burger to the html as a <h4>.
                    $("#info").append("<h4>Price: " + burgerPrice + "</h4>");
                }
            } else {
                //If the data array is empty add this to show the user.
                $("#info").append("<h4>No burger of the day!</h4>");
            }

        })

    //Putting the new end credits sequence API url into the fetch function.    
    fetch(creditsUrl)
        .then(function (respone) {
            return respone.json();
        })
        .then(function (data) {
            //Putting the png url into a variable but also splitting out "revision" from the url.
            var creditsImg = data[0].image.split("/revision")[0];
            //Putting the new image as a src into the id:info pictures.
            $("#info-picture").attr("src", creditsImg);
        })
});

$("#go-button").click(function () {
    //get the season value (1-13) like we are doing with the bobs burgers api
    var season = $("#dropdown1").val();
    //get the episode value like we are doing with the bobs api
    var episode = $("#dropdown2").val();
    var episodeNumber = (episode - 1)

    //add the season value to the end of our base url above- need to figure out how to get into the array so I can then pull the IMDb rating
    var imdbUrl = imdbBaseUrl + season;
    var ratingPara = document.createElement("p");
    var textRating = document.createTextNode("IMDb Rating: ");
    ratingPara.setAttribute("id", "info-text");
    ratingPara.appendChild(textRating);
    document.getElementById("info").appendChild(ratingPara);
    
    //do a fetch
    fetch(imdbUrl)
        .then(function (respone) {
            return respone.json();
        })
        .then(function (data) {
            console.log(data.episodes[episodeNumber].imDbRating);
            // now to navigate into each episode into the array- then the imDbRating
                    var imdbRating = data.episodes[episodeNumber].imDbRating;
                    console.log(imdbRating);
                    var imdbText = document.createTextNode(imdbRating);
                    ratingPara.appendChild(imdbText);
            })

});
