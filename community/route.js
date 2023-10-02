var express = require('express');
var router = express.Router();

var controller = require('./controller');
const authenticator = require('../helper/auth');

router.post('/createCommunity', authenticator.validateToken, (req, res, next) => {
    return controller.createCommunity(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.get('/getAll/:pageNumber/:pagePerSize', authenticator.validateToken, (req, res, next) => {
    controller
        .getAll(req)
        .then((result) => res.status(200).json({ data: result }))
        .catch((err) => next(err));
});

router.get('/getAllCommunityMember/:id/:pageNumber/:pagePerSize', authenticator.validateToken, (req, res, next) => {
    controller
        .getAllCommunityMember(req)
        .then((data) => res.status(200).json({ data: data }))
        .catch((err) => next(err));
});

router.get('/getMyOwnedCommunity/:pageNumber/:pagePerSize', authenticator.validateToken, (req, res, next) => {
    controller
        .getMyOwnedCommunity(req)
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
});

router.get('/getMyJoinedCommunity/:pageNumber/:pagePerSize', authenticator.validateToken, (req, res, next) => {
    controller
        .getMyJoinedCommunity(req)
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
});


module.exports = router;