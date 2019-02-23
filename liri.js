require("dotenv").config();
const Spotify = require("node-spotify-api");

const moment = require ("moment"); 
const axios = require("axios");
const fs = require("fs");

const keys = require("./keys.js");

// const spotify = new Spotify(keys.spotify);
const artist = process.argv.slice(3).join(' '); 
const song = " ";
const type = process.argv[2];

const liri = function (type, artist) {
    switch (type) {
        case "concertList":
        concertList(artist); 
            break;
        case "songInfo":
            // code block
            break;
        case "movieInfo":
            // code block

            break;
        case "random":
            //code block
            break;
        default:
           console.log ("Sorry something went wrong with your search!!"); 
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

            const showList = [
                "Venue Name: " + jsonData.venue.name,
                "Venue Location: " + jsonData.venue.city + jsonData.venue.country,
                "Date: " + jsononData.datetime
            ]
            console.log(showList); 
        });
}

liri(type, artist)