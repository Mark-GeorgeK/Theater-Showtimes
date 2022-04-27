const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 8000;
const URL = 'https://elcinema.com/en/theater/';
const CinemasURL = 'https://elcinema.com/en/theater/1/?order=rating&page='
const whereToLookFor = ['Point 90 Cinema', 'Sun City Cinema', 'Vox Mall of Egypt Cinema',
    'City Stars Cinema', 'Vox City Centre Almaza Cinema'];
const Cinemas = [];

async function getCinemaData(cinemaName, cinemaURL) {
    let ERROR = false;
    //if in file don't request..
    
    //if in whereToLookFor
    if (!(whereToLookFor.find((el) => el == cinemaName))) return;
    const response = await axios(cinemaURL).catch(err => {
        ERROR = true; //check behavior
        // if (err.response.status != 503) {
        console.log(`${err.response.status}: ${err.code} - ${err.response.statusText} @`);
        console.log(`${cinemaURL}`);
        //     return;
        // }
        // setTimeout(() => getCinemaData(cinemaName, cinemaURL), 5000);
        // getCinemaData(cinemaName, cinemaURL); //check that work-around for server-overloading
    });
    if (ERROR) return;
    // console.log(response.data);
    const HTML = response.data;
    const Movies = [];
    const $ = cheerio.load(HTML);
    const MovieElements = $('#theater-showtimes-container', HTML);
    $('.row', MovieElements).each(function () {
        let Movie = $(this);
        const movieName = $('.unstyled', Movie).find('h3').find('a').text();
        if (movieName) Movies.push(movieName);
    })
    const Cinema = { 'Cinema': cinemaName, 'URL': cinemaURL, Movies };
    // console.log(Cinema);
    Cinemas.push(Cinema);
}

//adjust asynchronicity
async function getHTML(url) {
    //catching errors in async/await?
    const response = await axios(url).catch(err => console.log(err));
    if (response == undefined) //check
        return 'Site can not be accessed at the moment.';
    const HTML = response.data;
    const $ = cheerio.load(HTML);
    $('.jumbo-theater', HTML).each(function () {
        let cinemaURL = $(this).find('a').eq(1).attr('href');
        let cinemaName = $(this).find('a').eq(1).text();
        cinemaURL = cinemaURL.split('/')[3];
        getCinemaData(cinemaName, URL + cinemaURL);
    })
}

async function runner() {
    await getHTML();
    console.log(Cinemas);
}

app.get('/', function (req, res) {
    // setTimeout(() => {
    // }, 2000);
    // console.log(Cinemas);
    res.json(Cinemas); //already setuped up while booting server
});

for (let i = 1; i <= 4; i++) {
    // console.log(CinemasURL + i);
    getHTML(CinemasURL + i);
}

// getHTML();
// runner(); //why not working
app.listen(PORT, () => console.log('server is running..'));
