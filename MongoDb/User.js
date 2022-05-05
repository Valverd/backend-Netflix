const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    myTvList: {type: Array},
    myMovieList: {type: Array},
    createdDate: {type: Date, default: Date.now()},
    admin: {type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;