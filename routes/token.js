const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../controllers/authController');

router.get('/token', auth, (req, res) => {

    const token = req.headers.authorization;

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        res.send(verified);
    } catch (err) {
        res.status(401).send(err);
    }

});

module.exports = router;