const dataDiv = document.querySelector('#data');

fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        data.forEach(element => {
            const Cinema = `<h2>${element.Cinema}</h2>`;
            let Movies = '<ul>';
            element.Movies.forEach(movie => {
                Movies += `<li>${movie}</li>`;
            });
            Movies += `</ul><hr>`;
            dataDiv.insertAdjacentHTML('beforeend', Cinema + Movies);
        })
    })
    .catch(err => console.log(err));
