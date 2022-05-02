const headerDiv = document.querySelector('#header');
const dataDiv = document.querySelector('#data');
const footerDiv = document.querySelector('#footer');

fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => {
        //header
        const header = `<div class="header"><span class="logo">MoviesHub</span><span class="Buy">Buy</span></div>`;
        headerDiv.insertAdjacentHTML('beforeend', header);
        data.forEach(cinema => {
            console.log(cinema.Movies);
            let cinemaHTML = '<div class="cinemas">';
            const Cinema = `<div><p class="CinemaName">${cinema.cinemaName}</p></div>`;
            let Movies = '<ul>';
            cinema.Movies.forEach(movie => {
                Movies += `<li><img src=${movie.movieImage} /><p class="MovieName">${movie.movieName}</p></li>`;
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
