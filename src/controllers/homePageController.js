import { Cinemas } from './getCinemasController';

let handleHomePage = async (req, res) => {
    const HomePageHTML = getHTMLElements(req);
    return res.render('homepage.ejs', { HomePageHTML });
};

let getHTMLElements = function (req) {
    let HomePageHTML = '';
    const header = `<div class="header">
                        <a href="/"><p class="logo">MoviesHub</p></a>
                        <div>
                            <form method="POST" action="/logout">
                                <button type="submit" class="logout-btn">Log out</button>
                            </form>
                        </div>  
                    </div>`;

    let cinemaHTML = '';
    // cinemaHTML += req.user.fullname;
    // cinemaHTML += Object.keys(req.user).join(", ");
    // console.log(req.user);
    Cinemas.forEach(cinema => {
        cinemaHTML += '<div class="cinemas">';
        const Cinema = `<div><p class="CinemaName">${cinema.cinemaName}</p></div>`;
        let Movies = '<ul>';
        cinema.Movies.forEach(movie => {
            const dynamicURL = cinema.cinemaName + '/' + movie.movieName;
            Movies += `<li><a href="/${dynamicURL}"><img src=${movie.movieImage} /><p class="MovieName">${movie.movieName}</p></a></li>`;
        });
        Movies += `</ul>`;
        cinemaHTML += Cinema + Movies + '<hr noshade width=15%></div>';
    });

    //footer
    const footer = `<div class="footer"><p>This is a footer</p></div>`;

    HomePageHTML += header + cinemaHTML + footer;
    return HomePageHTML;
}

module.exports = {
    getHTMLElements,
    handleHomePage
};
