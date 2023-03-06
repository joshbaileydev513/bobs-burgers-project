document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });

  $('.dropdown-trigger').dropdown();

var bobApi = "https://bobsburgers-api.herokuapp.com/burgerOfTheDay/?episode=10&season=3";

$("#go-button").click(function () {
    console.log("work");
    $("p").remove();
    $("#info-picture").remove();

    var burgerPara = document.createElement("p");
    var textBurger = document.createTextNode("Burger of the day: ");
    burgerPara.setAttribute("id", "info-text");
    burgerPara.appendChild(textBurger);
    document.getElementById("info").appendChild(burgerPara);

    var pricePara = document.createElement("p");
    var textPrice = document.createTextNode("Price: ");
    pricePara.setAttribute("id", "info-text");
    pricePara.appendChild(textPrice);
    document.getElementById("info").appendChild(pricePara);

    var ratingPara = document.createElement("p");
    var textRating = document.createTextNode("Episode Rating: ");
    ratingPara.setAttribute("id", "info-text");
    ratingPara.appendChild(textRating);
    document.getElementById("info").appendChild(ratingPara);

    fetch(bobApi)
        .then(function (respone) {
            return respone.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                var burgerName = data[i].name + "|";
                var burgerPrice = data[i].price + "|";

                var burgerText = document.createTextNode(burgerName);
                burgerPara.appendChild(burgerText);

                var priceText = document.createTextNode(burgerPrice);
                pricePara.appendChild(priceText);

                console.log(burgerName);
                console.log(burgerPrice);
            }


        })

});