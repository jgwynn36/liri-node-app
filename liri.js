require("dotenv").config();

//Modules - npm install 
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");

//
const keys = require("./keys");

//Spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

//User Input 
const type = process.argv[2];
const input = process.argv.slice(3).join(' ');

// Variables
const divider = "\n------------------------------------------------------------\n";

const liri = function (type, input) {
    switch (type) {
        case "concertList":
            concertList(input);
            break;
        case "songInfo":
            songInfo(input);
            break;
        case "movieInfo":
            movieInfo(input);
            break;
        case "doSomething":
            doSomething();
            break;
        default:
            console.log("Please enter a command and input to begin your search!!");
    }
};

const concertList = function (input) {
    console.log("Searching for Concerts with the criteria of " + input);

    const URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        const jsonData = response.data;
        //console.log(JSON.stringify(jsonData, null, 2)); Console Log Response for debugging 
        for (let i = 0; i < jsonData.length; i++) {
            jsonData.forEach(element => {
                console.log("Venue Name: " + jsonData[i].venue.name);
                console.log("Venue Location: " + jsonData[i].venue.country);
                console.log("Concert Date: " + moment(jsonData[i].datetime).format('MM/DD/YYYY'));
                console.log(divider);

                const concertData = `\nUsed artist information to find:  \nVenue: ${jsonData[i].venue.name} \nVenue Location: ${jsonData[i].venue.country} \nConcert Date: ${moment(jsonData[i].datetime).format('MM/DD/YYYY')} \n---------------------------------`

                fs.appendFile('log.txt', concertData, function (error) {
                    if (error) throw error;
                });
            });
        }
    });
}

const songInfo = function (song) {
    console.log('Searching for your song...' + song);
    if (song === null) {
        song = 'The Sign';
    } else {
        song = input;
    }
    console.log("Your Search information is .............");
    spotify.search({
            type: 'track',
            query: song
        },
        function (err, data) {
            if (!err) {
                console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
                console.log(`Song: ${data.tracks.items[0].name}`);
                console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
                console.log(`Album: ${data.tracks.items[0].album.name}`);
                console.log(divider);

                const songData = `\nUsed songInfo to find:  \nArtist: ${data.tracks.items[0].artist[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: {$data.tracks.items[0].album.name}\n---------------------------------`

                fs.appendFile('log.txt', songData, function (error) {
                    if (error) throw error;
                });
            }
        });
}

const movieInfo = function (movie) {
    console.log("Searching for your movie ...." + movie);
    if (movie === null) {
        movie = 'Mr. Nobody';
    } else {
        movie = input;
    }
    const URL = "http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    axios.get(URL).then(function (response) {
        const jsonData = response.data;
        //console.log(JSON.stringify(jsonData, null, 2)); Console log response for debugging 
        console.log("Title of the Movie: " + jsonData.Title);
        console.log("Release Year: " + jsonData.Year);
        console.log("IMDB Rating: " + jsonData.imdbRating);
        console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        console.log("Country: " + jsonData.Country);
        console.log("Language: " + jsonData.Language);
        console.log("Plot: " + jsonData.Plot);
        console.log("Actors: " + jsonData.Actors);
        console.log(divider);

        const movieData = `\nUsed movie information to find:  \nTitle of the Movie:: ${jsonData.Title} \nRelease Year: ${jsonData.Year} \nIMDB Rating: ${jsonData.imdbRating} \nRotten Tomatoes Rating: {$jsonData.Ratings[1].Value} \nCountry: ${jsonData.Country} \nLanguage: ${jsonData.Language} \nPlot: ${jsonData.Plot} \nActors: ${jsonData.Actors} \n---------------------------------`

        fs.appendFile('log.txt', movieData, function (error) {
            if (error) throw error;
        });
    });
}

const doSomething = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            //splits whatever is in random.txt into strings.
            let theSplit = data.split(",");
            console.log (theSplit);

            if (theSplit[0] === "songInfo") {
                let song = theSplit[1]; 
                songInfo(song);
            } else if (theSplit[0] === "movieInfo") {
                let movie = theSplit[0]; 
                movieInfo(movie);
            } else if (theSplit[0] === "concertList") {
                let input = theSplit[1]; 
                concertList(input);
            } else {
                console.log("Error: There's a problem with this call.")
            }
        }
    });
}

liri(type, input);