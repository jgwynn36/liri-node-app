require("dotenv").config();

const moment = require("moment");
const axios = require("axios");
const fs = require("fs");

const keys = require("./keys");

const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const type = process.argv[2];
const artist = process.argv.slice(3).join(' ');
const input = process.argv[4];
const song = process.argv.slice(5).join(' ');
// const dataInput = dataArray[1];
// const dataArray = data.split(',');

const liri = function (type, artist) {
    switch (type) {
        case "concertList":
            concertList(artist);
            break;
        case "songInfo":
            songInfo(song);
            // input = dataInput; 
            // song(); 
            break;
        case "movieInfo":
            // code block

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
    const divider = "\n------------------------------------------------------------\n\n";

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

            });
        }
    });
}

const songInfo = function (song) {
    console.log('Searching for your song...');
    if (song === undefined) {
        song = 'Happy'
    } else {
        song = input;
    }
    console.log("Your Search information is .............n/n");
    spotify.search({
            type: 'track',
            query: song
        },
        function (err, data) {
            if (!err) {
                console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
                console.log(`Song: ${data.tracks.items[0].name}`);
                console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
                console.log(`Album: ${data.tracks.items[0].album.name}`)

                let songData = `\nUsed songInfo to find:  \nArtist: ${data.tracks.items[0].artist[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} n\Album: {$data.tracks.items[0].album.name}n\---------------------------------`

                fs.appendFile('log.txt', songData, function (error) {
                    if (error) throw error;
                });
            }
        });
}
 
liri(type, artist, song); 