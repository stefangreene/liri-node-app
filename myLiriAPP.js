var axios = require("axios");
var Spotify = require('node-spotify-api');
// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    // Here we create a basic password-protected text prompt.
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
      // Here we create the prompt for OMDB MOVIE TITLE.
    {
      type: "input",
      message: "Search for a movie on OMDB",
      name: "inquirerMovie"
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Now Search Spotify for a song: First choose a search type?",
      choices: ["Album", "Artist", "Song"],
      name: "inquirerQuerytype"
    },
    // Here we allow the user to submit their Spotify search.
    {
      type: "input",
      message: "Search Spotify for music",
      name: "inquirerQuerySearch"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "press enter to submit",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {

var spotifyInput1 = inquirerResponse.inquirerQuerytype;
var spotifyInput2 = inquirerResponse.inquirerQuerySearch;
//spotifyInput1 = inqirerQuery.val();
//spotifyInput2 = inquirerSearch.val();
// Create an empty variable for holding the query type and search
var queryType = "";
var querySearch = "";

// Loop through all the words in the node arguments
// And do a little for-loop magic to handle the inclusion of "+"s
/*for (var z = 0; z < spotifyInput1.length; z++) {
  if (z > 0 && z < spotifyInput1.length) {
    queryType = queryType + "+" + spotifyInput1[z];
  }
  else {
    queryType += spotifyInput1[z];
  }
}*/
for (var v = 0; v < spotifyInput2.length; v++) {
    if (v > 0 && v < spotifyInput2.length) {
        querySearch = querySearch + "+" + spotifyInput2[v];
    }
    else {
        querySearch += spotifyInput2[v];
    }
  }

  console.log(queryType);
  console.log(querySearch);

//...........establish Spotify id and secret..........
var spotify = new Spotify({
    id: "957292c074de44eaa32f28f986fa6a67",
    secret: "96ea14fccb464f41b3c08e5d91ec5853"
  });

spotify.search({ type: 'track', query: 'All the Small Things'}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log("data"+data); 
  console.log("data.item"+data.item); 
  });

//................Axios OMDB NPM........................

// Store all of the arguments in an array
process.argv[inquirerResponse.inquirerMovie];
var nodeInputs = process.argv.slice().trim();
//var nodeInputs = inquirerResponse.inquirerMovie;
// Create an empty variable for holding the movie name
//nodeInputs = movieInputs.val();
var movieTitle = "";
// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 0; i < nodeInputs.length; i++) {
  if (i > 0 && i < nodeInputs.length) {
    movieTitle = movieTitle + "+" + nodeInputs[i];
  }
  else {
    movieTitle += nodeInputs[i];
  }
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
//.......debug search information.........
console.log(queryUrl);
console.log("nodeinputs"+nodeInputs);


//......request with static movie..........
axios.get(queryUrl).then(
  function(response) {
    console.log();
    console.log();
    console.log("Movie Title: " +response.data.Title);
    console.log("Rating: " +response.data.imdbRating);
    console.log("Released: " +response.data.Released);
    console.log("Rated: " +response.data.Rated);
    console.log("Cast: " +response.data.Actors);
    console.log("Director: " +response.data.Director);
    console.log("Awards: " +response.data.Awards);
    console.log("Poster: " +response.data.Poster);
    console.log();
    console.log();
    console.log();
    console.log();
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

});