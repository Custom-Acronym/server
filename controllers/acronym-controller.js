var express = require('express')
const { Acronym } = require('../models');

var router = express.Router()

/**
 * GET /api
 * @summary Fetches all acronyms and definitions
 * @return {[object]} 200 - A list of JSON objects containing the acronyms
 * @example GET /api
 * [
 *  {
 *      "_id":"5fa5d141ec2e5e8ee2b870b2",
 *      "acronym":"UIUC",
 *      "definition":"University of Illinois at Urbana-Champaign"
 *  },
 *  {
 *      "_id":"5fa606416954002a24131833",
 *      "acronym":"BK",
 *      "definition":"Burger King"
 *  }
 * ]
 */
router.get('/', (req, res) => {
    Acronym.find({}).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

/**
 * GET /api/:id
 * @summary Returns the definitions for a single acronym
 * @param {string} acronym the name of the acronym (case insensitive)
 * @return {[object]} 200 - a list of JSON objects containing acronyms matching the given acronym
 * @example GET /api/uiuc
 * [
 *  {
 *      "_id":"5fa5d141ec2e5e8ee2b870b2",
 *      "acronym":"UIUC",
 *      "definition":"University of Illinois at Urbana-Champaign"
 *  },
 *  {
 *      "_id":"5fa5d141ec2e5e8ee2b870b3",
 *      "acronym":"UIUC",
 *      "definition":"Uplink Interval Usage Code"
 *  }
 * ]
 */
router.get('/:acronym', (req, res) => {
    let acronym = new RegExp('\\b' + req.params.acronym + '\\b', 'i');
    Acronym.find({ acronym: acronym }).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

/**
 * POST /api
 * @summary Inserts a new acronym-definition pair
 * @param {Acronym} - the name and definition of the new acronym
 * @return {Object} 201 - a confirmation message and the id of the inserted acronym
 * @example POST /api {acronym: 'BK', definition: 'Burger King'}
 * {
 *  message: 'successfully created definition',
 *  id: '5fa5d141ec2e5e8ee2b870b2'
 * }
 */
router.post('/', (req, res) => {
    let acronym = new Acronym(req.body);
    acronym.save((err) => {
        if (err) {
            return res.status(400).send(err._message);
        }
        let newId = acronym._id.toString();
        res.status(201).send({ message: 'successfully created definition', id: newId });
    });
});

/**
 * PUT /api/:id
 * @summary Updates an existing acronym-definition pair
 * @param {string} id the ID of the acronym
 * @param {object} - the new values for the acronym
 * @return {string} 200 - a confirmation message
 * @example PUT /api/5fa5d141ec2e5e8ee2b870b2 {definition: 'New Definition'}
 * 'successfully updated definition'
 */
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let update = req.body;
    Acronym.findByIdAndUpdate(id, update, (err) => {
        if (err) {
            return res.status(400).send(err.toString());
        }
        res.send('successfully updated definition');
    });
});

/**
 * DELETE /api/:id
 * @summary Deletes an existing acronym-definition pair
 * @param {string} id the ID of the acronym
 * @return {string} 200 - a confirmation message
 * @example DELETE /api/5fa5d141ec2e5e8ee2b870b2
 * 'successfully deleted definition'
 */
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Acronym.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.status(400).send(err.toString());
        }
        res.send('successfully deleted definition');
    });
});

module.exports = router;