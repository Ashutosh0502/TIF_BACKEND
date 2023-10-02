const jwt = require('jsonwebtoken');
const users = require('../user/model');

const authService = {};

authService.validateToken = async (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;

    let result;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: '1d',
            issuer: process.env.ISSUER
        };
        try {
            result = jwt.verify(token, process.env.JWT_SECRET, options);
            const user = await users.findOne({ token }).exec();
            if (user) {
                req.decoded = result;
                req.user = user;
                next();
            } else {
                res.status(401).send({ message: 'token expire' });
            }
        } catch (err) {
            res.status(401).send({ message: 'token expire' });
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        res.status(401).send(result);
    }
}

module.exports = authService;