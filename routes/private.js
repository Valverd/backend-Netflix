const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/private', auth, (req, res) => {
    res.send('rota privada');
});

module.exports = router;