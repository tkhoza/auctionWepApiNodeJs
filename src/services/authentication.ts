const jwksRsa = require('jwks-rsa');
const expressJwt = require('express-jwt');

export const checkIfAuthenticated = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: './jwks.json'
    }),
    algorithms: ['RS256']
});