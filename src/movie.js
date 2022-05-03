const headerDiv = document.querySelector('#header');
const dataDiv = document.querySelector('#data');
const footerDiv = document.querySelector('#footer');

const dynamicURL = sessionStorage.getItem('dynamicURL');

fetch(`http://localhost:8000/movies/${dynamicURL}`)
    .then(res => res.json())
    .then(data => {
        //header
        const header = `<div class="header"><span class="logo">MoviesHub</span><span class="Buy">Buy</span></div>`;
        headerDiv.insertAdjacentHTML('beforeend', header);
        //data
        dataDiv.insertAdjacentHTML("beforeend", `<p>${data}</p>`)
        //footer
        const footer = `<div class="footer"><p>This is a footer</p></div>`;
        footerDiv.insertAdjacentHTML('beforeend', footer);
    })
    .catch(err => console.log(err));
