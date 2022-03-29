const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

//bodyparser middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//cors
app.use(cors());

//useRoutes
app.use('/books', require('./api/Books'));
app.use('/search', require('./api/Search'));
app.use('/genre', require('./api/Genre'));

//default
app.get('/', (req, res) => res.send("Hello"));

app.listen(PORT, () => console.log("Server started running on port " + PORT));