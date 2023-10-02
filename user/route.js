var express = require('express');
var router = express.Router();

var controller = require('./controller');
const authenticator = require('../helper/auth');

router.post('/sign-up', (req, res, next) => {
    return controller.add(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.post('/sign-in', (req, res, next) => {
    return controller.validate(req.body).then((response) => {
        return res.status(200).json({ data: response });
    }).catch((err) => {
        next(err);
    });
});

router.get('/validateMe', authenticator.validateToken, (req, res, next) => {
    const { password, token, ...userData } = req.user.toObject();
    return res.status(200).json({ data: userData });
});


module.exports = router;