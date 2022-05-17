
let handleMovieDetails = async (req, res) => {
    const { Cinemas } = require('../controllers/getCinemasController');
    //get the requested movie details from Cinemas array (DB?)
    //search for it in array till DB is up and running
    let movieDetails;
    for (const Cinema of Cinemas) {
        if (Cinema.cinemaName != req.params.cinemaName) continue;
        for (const movie of Cinema.Movies) {
            if (movie.movieName != req.params.movieName) continue;
            movieDetails = movie;
        }
    }
    const movieHTML = getMovieHTML(movieDetails, req);

    // const { header, cinemaHTML, footer } = getHTMLElements();
    return res.render('movie.ejs', { movieHTML });
};

const getMovieHTML = (data, req) => {
    let movieHTML = '';
    //header
    let header = `<div class="header">
                        <a href="/"><p class="logo">MoviesHub</p></a>
                        <div><ul>`;

    header += ` <li><a href='/search'>Search</a></li>
                <li><a href='/account'>Account</a></li>`;

    if (req.isAuthenticated()) {
        header += `<li><form method="POST" action="/logout">
                        <button type="submit" class="logout-btn">Log out</button>
                    </form></li>`;
    }
    else {
        header += `<li><form method="POST" action="/login">
                        <button type="submit" class="logout-btn">Login</button>
                    </form></li>`;
    }
    header += `     </div>
                </div>`;
    movieHTML += header;

    //data
    const ShowtimesArray = [];
    for (let i = 1; i < data.showtimesPrices.length; i += 2) {
        const temp1 = data.showtimesPrices.at(i - 1);
        const temp2 = data.showtimesPrices.at(i);
        ShowtimesArray.push(`${temp1}, ${temp2}`)
    }
    let showtimesHTML = '';
    ShowtimesArray.forEach(element => showtimesHTML += `<a href="#">${element}</a>`)
    let html =
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
                <li>
                    <form method="POST" action="/seats">
                        <button type="submit" class="btn btn-primary">seats</button>
                    </form>
                </li>
            </ul>
        </div>`;
    movieHTML += html;

    //footer
    const footer = `<div class="footer"><p><p></div>`;
    movieHTML += footer;
    return movieHTML;
};

module.exports = { handleMovieDetails };
