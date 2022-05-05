const headerDiv = document.querySelector('#header');
const dataDiv = document.querySelector('#data');
const footerDiv = document.querySelector('#footer');

const dynamicURL = sessionStorage.getItem('dynamicURL');

fetch(`http://localhost:8000/movies/${dynamicURL}`)
    .then(res => res.json())
    .then(data => {
        //header
        const header = `<div class="header">
                            <a href="/"><p class="logo">MoviesHub</p></a>
                            <a href="/login"><p class="Login">Login</p></a></div>`;
        headerDiv.insertAdjacentHTML('beforeend', header);
        //data
        let html = `<div class="movieDetails">
        <p style="font-size:xx-large">${data.movieName}</p>
        <img src="${data.movieImage}" style="justify-content:left"/>
        <div><p>IMDB Rating:${data.IMDBRating}</p>
        <p>Age: ${data.AgeRating}</p></div>
        <p>Language: ${data.Language}</p>
        <p>Genre: ${data.Genre}</p>
        <p class="description">Description: ${data.Description}</p>
        <div>Showtimes: ${data.showtimesPrices}</div>`;
        // data.showtimesPrices.forEach(el => html += `<div>${el}</div>`);
        // html += `</div>`;
        dataDiv.insertAdjacentHTML("beforeend", html);
        //footer
        const footer = `<div class="footer"><p>This is a footer</p></div>`;
        footerDiv.insertAdjacentHTML('beforeend', footer);
    })
    .catch(err => console.log(err));
