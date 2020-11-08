var express = require('express')
const { Acronym } = require('../models');

var router = express.Router()

router.get('/', (req, res) => {
    Acronym.find({}).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

router.get('/:acronym', (req, res) => {
    let acronym = new RegExp('\\b' + req.params.acronym + '\\b', 'i');
    Acronym.find({ acronym: acronym }).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

router.post('/', (req, res) => {
    let acronym = new Acronym(req.body);
    acronym.save((err) => {
        if (err) {
            return res.status(400).send(err._message);
        }
        res.status(201).send('successfully created acronym');
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let update = req.body;
    Acronym.findByIdAndUpdate(id, update, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send('success');
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Acronym.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send('success');
    });
});

module.exports = router;