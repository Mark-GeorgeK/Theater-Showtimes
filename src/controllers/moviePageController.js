
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
    const movieHTML = getMovieHTML(movieDetails);

    // const { header, cinemaHTML, footer } = getHTMLElements();
    return res.render('movie.ejs', { movieHTML });
};

const getMovieHTML = data => {
    let movieHTML = '';
    //header
    const header = `<div class="header">
                        <a href="/"><p class="logo">MoviesHub</p></a>
                        <div>
                            <form method="POST" action="/logout">
                                <button type="submit" class="logout-btn">Log out</button>
                            </form>
                        </div>  
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
            </ul>
        </div>`;
    movieHTML += html;

    //footer
    const footer = `<div class="footer"><p>This is a footer</p></div>`;
    movieHTML += footer;
    return movieHTML;
};

module.exports = { handleMovieDetails };
