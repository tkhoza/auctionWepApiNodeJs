import jwksRsa from 'jwks-rsa';
import expressJwt from 'express-jwt';

export const checkIfAuthenticated = expressJwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: './jwks.json'
    }),
    algorithms: ['RS256']
});