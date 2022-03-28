require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const private = require('./routes/private');

mongoose.connect('mongodb://localhost/netflix')
    .then(() => console.log('-MongoDB Connected-'))
    .catch(err => console.log(err));

app.use(cors({ credentials: true }));
app.use(express.json(), express.urlencoded({ extended: bodyParser }));


app.use('/', private);
app.use('/user', userRouter);


app.listen(5000, () => {
    console.log("--Running on PORT 5000--");
})