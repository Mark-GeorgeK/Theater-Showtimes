const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    res.json('movies requested');
});

router.get('/:cinemaName/:movieName', function (req, res) {
    const str = 'requested ' + req.params.cinemaName + '/' + req.params.movieName;
    res.json(str);
});

module.exports = router;