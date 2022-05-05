const express = require('express');
const router = express.Router();
const User = require('../MongoDb/User');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {

    const selectedUser = await User.findOne({ email: req.body.email });
    if (selectedUser) {
        return res.status(400).send('Email já cadastrado!');
    };

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();
        res.send("Usuário registrado!");
    } catch (err) {
        res.status(400).send(err);
    };

});


router.post('/login', async (req, res) => {

    const selectedEmail = await User.findOne({ email: req.body.email });
    if (!selectedEmail) {
        return res.status(404).send("Email ou Senha digitados incorretamente!");
    };

    const selectedPassword = await User.findOne({ password: req.body.password });
    if (!selectedPassword) {
        return res.status(404).send("Email ou Senha digitados incorretamente!");
    };

    const token = jwt.sign({ name: selectedEmail.name, email: selectedEmail.email, admin: selectedEmail.admin }, process.env.TOKEN_SECRET, {expiresIn: '24h'});

    try {
        res.send({name: selectedEmail.name, email: selectedEmail.email, admin: selectedEmail.admin, token});
    } catch (err) {
            res.send(err);
        }

    });



module.exports = router;