const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const token = req.cookies.auth_token;

    if(!token){
        return res.status(401).send("Acesso não autorizado!");
    };

    try{
        const userVerified = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
        next();
    } catch (err) {
        res.status(400).send(err);
    };

};

module.exports = auth;