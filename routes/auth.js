// const jwt = require("express-jwt");
// const secret = require("../config").secret;

// function getTokenFromHeader(req){
//     if(!req.headers.authorization) return null;
//     const token = req.headers.authorization.split(" ");
//     if(token[0] !== "Ecommerce") return null;
//     return token[1];
// }

// const auth = {
//     required: jwt({
//         secret,
//         userProperty: 'payload',
//         getToken: getTokenFromHeader
//     }),
//     optional: jwt({
//         secret,
//         userProperty: 'payload',
//         credentialsRequired: false,
//         getToken: getTokenFromHeader
//     })
// };

// module.exports = auth;




const jwt = require('jsonwebtoken');

const secret = require("../config").secret;


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
    return res.status(401).send({ error: 'No token provided' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res. status(401).send({ error: 'Token error' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) 
        return res.status(401).send({ error: 'Token malformatted' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' });

        req.payload = decoded

    return next();
    })
    
};