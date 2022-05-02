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
    if (!(whereToLookFor.find(cinema => cinema == cinemaName))) return;
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
        let MovieElement = $(this);
        const movieDetails = $('.unstyled', MovieElement);

        const movieName = movieDetails.find('h3').text().trim();

        let movieImage;
        const img = MovieElement.find('img');
        if (img) movieImage = img.attr('data-src');

        const IMDBRating = $('.legend', movieDetails).text();
        const AgeRating = $('.censorship', movieDetails).find('li').eq(1).text();
        const Language = movieDetails.find('ul').eq(3).find('li').eq(1).text().trim();

        const Genre = [];
        movieDetails.find('ul').eq(4).find('li').each(function () { Genre.push($(this).text().trim()) });

        let Description = "";
        movieDetails.find('div').find('p').each(function () { if ($(this).text()) Description += ($(this).text()) });

        const showtimesPrices = [];
        $('.showtimes', movieDetails).find('td').each(function () {
            const str = $(this).text().trim().replace('\n', '').replace(/\s/g, '');
            if (str && !str.startsWith('More')) showtimesPrices.push(str);
        });

        const Movie = { movieName, movieImage, IMDBRating, AgeRating, Language, Genre, Description, showtimesPrices };
        if (movieName) Movies.push(Movie);
    });
    const Cinema = { cinemaName, cinemaURL, Movies };
    Cinemas.push(Cinema);
}

//adjust asynchronicity
async function getCinemas(url) {
    const response = await axios(url).catch(err => console.log(`Error on ${url}`));
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
    await getCinemas();
    console.log(Cinemas);
}

app.get('/', function (req, res) {
    // setTimeout(() => {
    // }, 2000);
    // console.log(Cinemas);
    res.json(Cinemas); //already setuped up while booting server
});

//handle variable page number problem with server overloading in mind
for (let i = 1; i <= 8; i++) {
    // console.log(CinemasURL + i);
    getCinemas(CinemasURL + i);
}

// getCinemas();
// runner(); //why not working
app.listen(PORT, () => console.log('server is running..'));
