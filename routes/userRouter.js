const express = require('express');
const router = express.Router();
const User = require('../MongoDb/User');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) {
        return res.send('Email já cadastrado!');
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();
        res.send("Usuário registrado!");
    } catch (err) {
        res.send(err);
    };

});


router.post('/login', async (req, res) => {

    const selectedEmail = await User.findOne({ email: req.body.email });
    if (!selectedEmail) {
        return res.send("Email ou Senha digitados incorretamente!");
    };

    const selectedPassword = await User.findOne({ password: req.body.password });
    if (!selectedPassword) {
        return res.send("Email ou Senha digitados incorretamente!");
    };

    const token = jwt.sign({ _id: selectedEmail._id, name: selectedEmail.name }, process.env.TOKEN_SECRET, {expiresIn: 30});


    try {
        res.send({name: selectedEmail.name, email: selectedEmail.email, admin: selectedEmail.admin});
    } catch (err) {
            res.send(err);
        }

    });


module.exports = router;