const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const booksSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

module.exports = booksSchema;
