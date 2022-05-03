const headerDiv = document.querySelector('#header');
const dataDiv = document.querySelector('#data');
const footerDiv = document.querySelector('#footer');

function saveURL(dynamicURL) {
    sessionStorage.setItem('dynamicURL', dynamicURL);
}

fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => {
        //header
        const header = `<div class="header"><a href="/"><span class="logo">MoviesHub</span></a><span class="Buy">Buy</span></div>`;
        headerDiv.insertAdjacentHTML('beforeend', header);
        data.forEach(cinema => {
            console.log(cinema.Movies);
            let cinemaHTML = '<div class="cinemas">';
            const Cinema = `<div><p class="CinemaName">${cinema.cinemaName}</p></div>`;
            let Movies = '<ul>';
            cinema.Movies.forEach(movie => {
                const dynamicURL = cinema.cinemaName + '/' + movie.movieName;
                Movies += `<li><a href="/src/movie.html" onclick="saveURL('${dynamicURL}')"><img src=${movie.movieImage} /><p class="MovieName">${movie.movieName}</p></a></li>`;
            });
            Movies += `</ul>`;
            cinemaHTML += Cinema + Movies + '<hr noshade width=15%></div>';
            dataDiv.insertAdjacentHTML('beforeend', cinemaHTML);
        })
        //footer
        const footer = `<div class="footer"><p>This is a footer</p></div>`;
        footerDiv.insertAdjacentHTML('beforeend', footer);
    })
    .catch(err => console.log(err));
