const express = require("express");
const router = express.Router();

//import model
const Genre = require('../config/db').Genre;

//ROUTE  : /apigenre 
//METHOD : GET
//DESC   : get genre data
router.get('/', (req, res) => {
    Genre.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
})

//ROUTE  : /api/genre/count/:name
//METHOD : GET
//DESC   : get genre count
router.get('/count/:name', (req, res) => {
    Genre.findOne({ genre_name: req.params.name })
        .then(data => res.json(data.genre_count))
        .catch(err => console.log(err));
})

module.exports = router;
