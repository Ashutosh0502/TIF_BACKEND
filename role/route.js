var express = require('express');
var router = express.Router();

var controller = require('./controller');

router.post('/createRole', (req, res, next) => {
    return controller.createRole(req).then((result) => {
        return res.status(200).json({ data: result });
    }).catch((err) => next(err));
});

router.get('/getAll/:pageNumber/:pagePerSize', (req, res, next) => {
    controller
        .getAll(req)
        .then((data) => res.status(200).json(data))
        .catch((err) => next(err));
});

module.exports = router;