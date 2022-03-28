const mongoose = require("mongoose");
const keys = require("../config/keys");

const booksSchema = require('../models/Books');
const genreSchema = require('../models/Genre');

//mongodb connect
const booksConn = mongoose.createConnection(keys.booksURI);
const genreConn = mongoose.createConnection(keys.genreConn);

const Book = booksConn.model('Book', booksSchema);
const Genre = genreConn.model('Genre', genreSchema);

module.exports = {
    Book,
    Genre
}