const express = require('express');
const router = express.Router();
const User = require('../MongoDb/User');

router.post('/addMyTvList', async (req, res) => {

    let selectedEmail = await User.findOne({email: req.body.email});

    let list = {
        myTvList: [...selectedEmail.myTvList, req.body.myTvList]
    };


    try{
        await User.findByIdAndUpdate(selectedEmail.id, list);
        res.send('lista atualizada');
    } catch(err) {
        res.send(err);
    }
});

router.post('/addMyMovieList', async (req, res) => {

    let selectedEmail = await User.findOne({email: req.body.email});

    let list = {
        myMovieList: [...selectedEmail.myMovieList, req.body.myMovieList]
    };

    try{
        await User.findByIdAndUpdate(selectedEmail.id, list);
        res.send('lista atualizada');
    } catch(err) {
        res.send(err);
    }
});

router.post('/removeMyMovieList', async (req, res) => {

    let selectedEmail = await User.findOne({email: req.body.email});

    let list = {
        myMovieList: req.body.myMovieList
    }

    try{
        await User.findByIdAndUpdate(selectedEmail.id, list);
        res.send('lista atualizada.')
    } catch(err) {
        res.send(err);
    }
    
});


router.post('/removeMyTvList', async (req, res) => {

    let selectedEmail = await User.findOne({email: req.body.email});

    let list = {
        myTvList: req.body.myTvList
    };

    try{
        await User.findByIdAndUpdate(selectedEmail.id, list);
        res.send('lista atualizada.')
    } catch(err) {
        res.send(err);
    }
    
});


router.post('/getTvList', async (req, res) => {

    let selectedEmail = await User.findOne({email: req.body.email});
    try{
        res.send(selectedEmail.myTvList);
    } catch(err) {
        res.send(err);
    }

});


router.post('/getMovieList', async (req, res) => {

    let selectedEmail = await User.findOne({email: req.body.email});
    try{
        res.send(selectedEmail.myMovieList);
    } catch(err) {
        res.send(err);
    }

});


module.exports = router;