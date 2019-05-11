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
      choices: ["album", "artist", "track"],
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
    
  ]).then(function(inquirerResponse) {
        var queryType = "";
        var querySearch = "";
        var movieTitle = "";

    function prepInput(){
        spotifyInput1 = inquirerResponse.inquirerQuerytype;
        queryType = spotifyInput1.replace(/ /g, '+');
        console.log("QueryType: "+ queryType);

        spotifyInput2 = inquirerResponse.inquirerQuerySearch;
        querySearch = spotifyInput2.replace(/ /g, '+');
        console.log("Query Search: "+ querySearch);

        omdbInput = inquirerResponse.inquirerMovie;
        movieTitle = omdbInput.replace(/ /g, '+');
        console.log("Movie Title: "+ movieTitle);
      }
      prepInput();


//...........establish Spotify id and secret..........
var spotify = new Spotify({
    id: "957292c074de44eaa32f28f986fa6a67",
    secret: "96ea14fccb464f41b3c08e5d91ec5853"
  });

spotify.search({ type: queryType, query: querySearch}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.artists.href); 

  });

//................Axios OMDB NPM........................
var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";
//.......debug search information.........
//console.log("queryURL"+queryUrl);
//console.log("nodeinputs"+nodeInputs);


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