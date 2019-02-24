require("dotenv").config();

const moment = require("moment");
const axios = require("axios");
const fs = require("fs");

const keys = require("./keys");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const type = process.argv[2];
const artist = process.argv.slice(3).join(' ');
const input = process.argv.slice(4).join(' ');
const song = process.argv.slice(5).join(' ');
const divider = "\n------------------------------------------------------------\n";
// const dataInput = dataArray[1];
// const dataArray = data.split(',');

const liri = function (type, artist) {
    switch (type) {
        case "concertList":
            concertList(artist);
            break;
        case "songInfo":
            songInfo(song);
            break;
        case "movieInfo":
            movieInfo(movie);
            break;
        case "random":
            //code block
            break;
        default:
            console.log("Sorry something went wrong with your search!!");
    }
}

const concertList = function (artist) {
    console.log(artist)
    console.log('concertList')

    const URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(URL).then(function (response) {
        const jsonData = response.data;

        console.log(JSON.stringify(jsonData, null, 2));

        for (let i = 0; i < jsonData.length; i++) {
            jsonData.forEach(element => {
                console.log("Venue Name: " + jsonData[i].venue.name);
                console.log("Venue Location: " + jsonData[i].venue.country);
                console.log("Concert Date: " + moment(jsonData[i].datetime).format('MM/DD/YYYY'));
                console.log(divider);

                fs.appendFile('log.txt', songData, function (error) {
                    if (error) throw error;
                });

            });
        }
    });
}

const songInfo = function (song) {
    console.log('Searching for your song...');
    if (song === undefined) {
        song = 'The Sign'
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

                const songData = `\nUsed songInfo to find:  \nArtist: ${data.tracks.items[0].artist[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} n\Album: {$data.tracks.items[0].album.name}n\---------------------------------`

                fs.appendFile('log.txt', songData, function (error) {
                    if (error) throw error;
                });
            }
        });
}

const movieInfo = function (movie) {
    console.log("Searching for your movie ....");
    if (movie === undefined) {
        movie = 'Mr. Nobody'
    } else {
        movie = input;
    }
    const URL = "http://www.omdbapi.com/?apikey=trilogy&" + movie;

    axios.get(URL).then(function (response) {
        const jsonData = response.data;

        console.log(JSON.stringify(jsonData, null, 2));
        for (let i = 0; i < jsonData.length; i++) {
            jsonData.forEach(element => {
                console.log("Title of the Movie: " + jsonData[i].venue.name);
                console.log("Venue Location: " + jsonData[i].venue.country);
                console.log("Concert Date: " + moment(jsonData[i].datetime).format('MM/DD/YYYY'));
                console.log(divider);

                fs.appendFile('log.txt', songData, function (error) {
                    if (error) throw error;
                });

            });
        }
    });
}

liri(type, artist, song);