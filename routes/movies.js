const express = require('express');

const router = express.Router();

// router.get('/', function (req, res) {
//     res.json('movies requested');
// });

//handle not found get request?

router.get('/:cinemaName/:movieName', function (req, res) {
    const Cinemas = require('../index').array;
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
    res.json(movieDetails);
});

module.exports = router;