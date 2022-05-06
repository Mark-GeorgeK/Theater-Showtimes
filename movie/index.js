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
        const ShowtimesArray = [];
        for (let i = 1; i < data.showtimesPrices.length; i += 2) {
            const temp1 = data.showtimesPrices.at(i - 1);
            const temp2 = data.showtimesPrices.at(i);
            ShowtimesArray.push(`${temp1}, ${temp2}`)
        }
        let showtimesHTML = '';
        ShowtimesArray.forEach(element => showtimesHTML += `<a href="#">${element}</a>`)
        let html =
            `<div>
            <p style="font-size:xx-large">${data.movieName}</p>
            <img src="${data.movieImage}" style="float:left;padding-left:15%"/>
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
        dataDiv.insertAdjacentHTML("beforeend", html);
        //footer
        const footer = `<div class="footer"><p>This is a footer</p></div>`;
        footerDiv.insertAdjacentHTML('beforeend', footer);
    })
    .catch(err => console.log(err));
