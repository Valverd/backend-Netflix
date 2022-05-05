require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const token = require('./routes/token');
const listRouter = require('./routes/listRouter');

mongoose.connect(process.env.MONGO_DB_CONNECT)
    .then(() => console.log('-MongoDB Connected-'))
    .catch(err => console.log(err));

app.use(cors({ credentials: true }));
app.use(express.json(), express.urlencoded({ extended: bodyParser }));


app.use('/', token);
app.use('/user', userRouter);
app.use('/list', listRouter);


app.listen(process.env.PORT || 5000, () => {
    console.log("--Running on PORT 5000--");
})