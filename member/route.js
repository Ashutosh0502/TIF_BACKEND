var express = require('express');
var router = express.Router();

var controller = require('./controller');
const authenticator = require('../helper/auth');

router.post('/addMember', authenticator.validateToken, (req, res, next) => {
    return controller.addMember(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.delete("/deleteMember/:id", authenticator.validateToken, (req, res, next) =>
    controller
        .deleteMember(req)
        .then((result) => res.status(200).json({ status: result }))
        .catch((err) => next(err))
);

module.exports = router;