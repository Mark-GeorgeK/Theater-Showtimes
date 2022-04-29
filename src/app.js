const dataDiv = document.querySelector('#data');

fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.forEach(cinema => {
            const Cinema = `<h2>${cinema.cinemaName}</h2>`;
            let Movies = '<ul>';
            cinema.Movies.forEach(movie => {
                Movies += `<li><img src=${movie.movieImage} /><p>${movie.movieName}</p></li>`;
            });
            Movies += `</ul><hr>`;
            dataDiv.insertAdjacentHTML('beforeend', Cinema + Movies);
        })
    })
    .catch(err => console.log(err));
