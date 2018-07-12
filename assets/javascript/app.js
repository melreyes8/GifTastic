// GIPHY API key: AY5u6HCbUppUrpjGjjwBeSkfcXqf8dCw
// Requested URL: https://api.giphy.com/v1/gifs/search?api_key=AY5u6HCbUppUrpjGjjwBeSkfcXqf8dCw&q=disney&limit=10&offset=0&rating=G&lang=en

var topics = [
    "Toy Story", "Finding Nemo", "A Bug's Life", "Cinderella", "Sleeping Beauty", 
    "The Parent Trap", "Who Framed Roger Rabit", "Cool Runnings", "Air Bud", "Pirates of the Caribbean"
]

// Use a for loop to create a button for each topics
for (var i=0; i<topics.length; i++){
    var button = $('<button>').text(topics[i]);
    $('#disneyButtons').append(button);

}

// Used a for loop to create a button for each topic in the array
// for (var index of topics){
//     button = $('<button>').text(index);
//     $('#disneyButtons').append(button);     
// }

// Add new buttons to the disneyButtons div when user submits Disney film name
$('#addFilm').on('click', function(){
    event.preventDefault();
    var filmName = $('input').val();

    topics.push(filmName);

    var button = $('<button>').text(filmName[0].toUpperCase() + filmName.slice(1));
    $('#disneyButtons').append(button);
    $('#disney-input').val("");
});

// Event listener for disneyButtons
$(document).on('click', '#disneyButtons button', function() {
// Storing our giphy API URL for a random Disney film
    var disney = $(this);
    // empty the gif div
    $('#disneyGifs').empty();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=AY5u6HCbUppUrpjGjjwBeSkfcXqf8dCw&q=' + disney + '&limit=10'; 
        
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // After the data from the AJAX request comes back
        .then(function(response) {
        console.log(response.data);
        var responseData = response.data;

        for(var i=0; i < responseData.length; i++) {
            var addGifDiv = $('<div>');
            var p = $('<p>');
            p.text("Rating: " + responseData[i].rating);

        // Constructing HTML containing the 10 gifs and ratings

        // Creating and storing a paragraph tag for the Rating
        // var rating = $('<p>');    

        // Creating and storing an image tag for the gif
        var disneyGif = $('<img>');
        
        disneyGif.addClass('gifs');
        disneyGif.attr('src', responseData[i].images.fixed_height_still.url);
        disneyGif.attr('data-still', responseData[i].images.fixed_height_still.url);
        disneyGif.attr('data-animate', responseData[i].images.fixed_height.url);
        disneyGif.attr('data-state', 'still');
        // rating.text('Rating: ' + responseData[i].rating);
        addGifDiv.append(disneyGif);
        addGifDiv.append(p);
        addGifDiv.prependTo($('#disneyGifs'));

        // Prepending the disneyGif to the disneyGifs div

        // $("#disneyGifs").append(disneyGif, rating);

      // Empty the contents of the disneyGifs div when another disneyButton is selected for 10 gifs to appear on page
    //   $("#disneyGifs").empty();
    //   $("#disneyGifs").append(disneyGif, p);             

    }        

    $('.gifs').on('click', function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr('data-state');
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
        }
      });
    })
});