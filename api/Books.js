const express = require("express");
const router = express.Router();

//import model
const Book = require('../config/db').Book;
const Genre = require('../config/db').Genre;

//ROUTE  : /api/books 
//METHOD : GET
//DESC   : show all books
router.get('/', (req, res) => {
    Book.find().then((data) => {
        return res.json(data)
    }).catch(err => console.log(err))
})


//ROUTE  : /api/books 
//METHOD : POST
//DESC   : add books to the database
router.post('/add', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const author = req.body.author;
    const genre = req.body.genre;

    //if new genre then add
    Genre.findOne({ genre_name: genre }).then(data => {
        console.log(data)
        if (data === null) {
            //No data present or genre does not match
            const newGenre = new Genre({
                genre_name: genre,
                genre_count: 1
            })

            newGenre.save().then(data => console.log(data)).catch(err => console.log(err));

        } else if (data) {
            //genre Matched increase genre count
            data.genre_count++;
            data.save().then(newData => console.log(newData)).catch(err => console.log(err));
        }
    }).catch(err => console.log(err))

    const book = new Book({
        name,
        description,
        author,
        genre
    })

    book.save()
        .then(data => console.log(data))
        .catch(err => console.log(err))
})

//ROUTE  : /api/books/edit/:id 
//METHOD : POST
//DESC   : edit book to the database
router.post('/edit/:id/:genre', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const author = req.body.author;
    const genre = req.body.genre;

    const update = {
        name,
        description,
        author,
        genre
    }

    //check genre
    if (genre !== req.params.genre) {
        //update genre
        Genre.findOne({ genre_name: genre }).then(data => {
            if (data === null) {
                //decrease genre count
                Genre.findOne({ genre_name: req.params.genre }).then(data => {
                    data.genre_count--;
                    data.save();
                })
                //create a new genre
                const newGenre = new Genre({
                    genre_name: genre,
                    genre_count: 1
                })

                newGenre.save().then(data => res.json({ message: `New Genre ${data.genre_name} created. Book ${name} has been added to the genre` })).catch(err => console.log(err));

            } else {
                //increase genre count
                Genre.findOne({ genre_name: req.params.genre }).then(data => {
                    data.genre_count--;
                    data.save().then(data => console.log(data)).catch(err => console.log(err));
                })

                data.genre_count++;
                data.save().then(data => res.json({ message: `The Genre of the book '${name}' has been changed to ${data.genre_name}`, data: data })).catch(err => console.log(err));
            }

        }).catch(err => console.log(err));
    }

    Book.findOneAndUpdate({ _id: req.params.id }, update, { new: true })
        .then(data => console.log(data))
        .catch(err => console.log(err))

})


//ROUTE  : /books/updateMany/description
//METHOD : POST
//DESC   : update description of multiple documents
router.post('/updateMany/description', (req, res) => {
    const updateDocumentId = req.body.id;
    const updateValue = req.body.updateValue;

    Book.updateMany(
        { _id: { $in: updateDocumentId } },
        { $set: { description: updateValue } }
    ).then(data => {
        return res.json(data);
    }).catch(err => console.log(err));
})


//ROUTE  : /books/updateMany/name 
//METHOD : POST
//DESC   : update name of  multiple documents
router.post('/updateMany/name', (req, res) => {
    const updateDocumentId = req.body.id;
    const updateValue = req.body.updateValue;

    console.log(updateDocumentId, updateValue)

    Book.updateMany(
        { _id: { $in: updateDocumentId } },
        { $set: { name: updateValue } }
    ).then(data => {
        return res.json(data);
    }).catch(err => console.log(err));
})

//ROUTE  : /books/updateMany/author 
//METHOD : POST
//DESC   : update author of  multiple documents
router.post('/updateMany/author', (req, res) => {
    const updateDocumentId = req.body.id;
    const updateValue = req.body.updateValue;

    console.log(updateDocumentId, updateValue)

    Book.updateMany(
        { _id: { $in: updateDocumentId } },
        { $set: { author: updateValue } }
    ).then(data => {
        return res.json(data);
    }).catch(err => console.log(err));
})

module.exports = router;