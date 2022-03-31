const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send("Acesso não autorizado");
    };

    try{
        await jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        res.status(401).send(err);
    };

};

module.exports = auth;