const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genre_name: {
        type: String,
        required: true
    }
})

module.exports = genreSchema;