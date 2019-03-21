const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Scores = require('../models/score');

const scoreRouter = express.Router();

mongoose.set('useFindAndModify', false);

scoreRouter.use(bodyParser.json());

scoreRouter.route('/')
    .get((req, res, next) =>
    {
        Scores.find({})
            .then((scores) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(scores);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) =>
    {
        Scores.create(req.body)
            .then((scores) =>
            {
                console.log('Student Added ', scores);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(scores);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) =>
    {
        res.statusCode = 403;
        res.end('PUT operation not supported on /scores');
    })
    .delete((req, res, next) =>
    {
        Scores.remove({})
            .then((resp) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

scoreRouter.route('/:stuID')
    .get((req, res, next) =>
    {
        Scores.findOne({stuID: req.params.stuID})
            .then((scores) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(scores);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) =>
    {
        res.statusCode = 403;
        res.end('POST operation not supported on /scores/' + req.params.stuID);
    })
    .put((req, res, next) =>
    {
        Scores.findOneAndUpdate({stuID: req.params.stuID}, {
            $set: req.body
        }, {new: true})
            .then((scores) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(scores);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) =>
    {
        Scores.findOneAndDelete({stuID: req.params.stuID})
            .then((resp) =>
            {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = scoreRouter;