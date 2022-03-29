const express = require("express");
const req = require("express/lib/request");
const { booksURI } = require("../config/keys");
const router = express.Router();

//import model
const Book = require('../config/db').Book;

//ROUTE  : /api/search?name="" 
//METHOD : GET
//DESC   : search by name or description
router.get('/', (req, res) => {
    const field = req.query.field;
    Book.find({
        $or: [
            { name: { $regex: field, $options: "i" } },
            { description: { $regex: field, $options: "i" } }
        ]
    })
        .then(data => {
            return res.status(200).json({ message: "Search Successful", data: data })
        })
        .catch(err => console.log(err))
})

module.exports = router;