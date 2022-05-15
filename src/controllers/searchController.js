
function HandleSearchPage(req, res) {
    const HTML = '';
    return res.render('search.ejs', { req, HTML });
}

function searchFor(req, res) {
    const { Cinemas } = require('../controllers/getCinemasController');
    //get the requested movie details from Cinemas array (DB?)
    //search for it in array till DB is up and running

    const searchWord = req.body.movie.toUpperCase();
    // console.log(searchWord + '.........................');

    let movieDetails;
    let availableIn = [];
    for (const Cinema of Cinemas) {
        for (const movie of Cinema.Movies) {
            // console.log(movie.movieName);
            if (movie.movieName.toUpperCase() != searchWord) continue;
            if (availableIn.length == 0) movieDetails = movie;
            availableIn.push(Cinema.cinemaName);
        }
    }

    if (!movieDetails) return res.render('search.ejs', { HTML: "Movie Not Found!" });

    let data = movieDetails;
    // console.log(data);
    const ShowtimesArray = [];
    for (let i = 1; i < data.showtimesPrices.length; i += 2) {
        const temp1 = data.showtimesPrices.at(i - 1);
        const temp2 = data.showtimesPrices.at(i);
        ShowtimesArray.push(`${temp1}, ${temp2}`)
    }
    let showtimesHTML = '';
    ShowtimesArray.forEach(element => showtimesHTML += `<a href="#">${element}</a>`)
    let HTML =
        `<div class ="MoviePage">
            <p style="font-size:xx-large">${data.movieName}</p>
            <img src="${data.movieImage}" />
            <ul class="movieDetails">
                <li>IMDB Rating:${data.IMDBRating}</li>
                <li>Age: ${data.AgeRating}</li>
                <li>Language: ${data.Language}</li>
                <li>Genre: ${data.Genre}</li>
                <li class="description">Description: ${data.Description}</li>
                <li class="dropdown">
                    <button class="dropbtn">Show-times</button>
                    <div class="dropdown-content">
                        ${showtimesHTML}
                    </div>
                </li>
            </ul>
        </div>`;
        
    HTML += `<p>Available in Cinemas: ${availableIn.join(", ")}</p>`;

    return res.render('search.ejs', { req, HTML });
}

module.exports = { HandleSearchPage, searchFor };
