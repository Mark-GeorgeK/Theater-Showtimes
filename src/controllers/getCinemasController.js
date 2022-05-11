const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://elcinema.com/en/theater/';
const CinemasURL = 'https://elcinema.com/en/theater/1/?order=rating&page='
const whereToLookFor = ['Point 90 Cinema', 'Sun City Cinema', 'Vox Mall of Egypt Cinema',
    'City Stars Cinema', 'Vox City Centre Almaza Cinema'];
const Cinemas = [];

async function getCinema(cinemaName, cinemaURL) {
    let ERROR = false;
    if (!(whereToLookFor.find(cinema => cinema == cinemaName))) return;
    const response = await axios(cinemaURL).catch(err => {
        ERROR = true;
        getCinema(cinemaName, cinemaURL);
    });
    if (ERROR) return;
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

async function getCinemas(url) {
    let ERROR = false;
    const response = await axios(url).catch(err => {
        getCinemas(url);
        ERROR = true;
    });
    if (ERROR) return;
    if (response == undefined)
        return 'Site can not be accessed at the moment.';
    const HTML = response.data;
    const $ = cheerio.load(HTML);
    $('.jumbo-theater', HTML).each(function () {
        let cinemaURL = $(this).find('a').eq(1).attr('href');
        let cinemaName = $(this).find('a').eq(1).text();
        cinemaURL = cinemaURL.split('/')[3];
        getCinema(cinemaName, URL + cinemaURL);
    })
}

function loadCinemas() {
    for (let i = 1; i <= 8; i++)
        getCinemas(CinemasURL + i);
}

module.exports = { loadCinemas, Cinemas };