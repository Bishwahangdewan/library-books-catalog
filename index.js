const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

//useRoutes
app.use('/books', require('./api/Books'));

//default
app.get('/', (req, res) => res.send("Hello"));

app.listen(PORT, () => console.log("Server started running on port " + PORT));