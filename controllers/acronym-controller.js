var express = require('express')
const { Acronym } = require('../models');

var router = express.Router()

/**
 * GET /api/acronym
 * @summary Fetches all acronyms and definitions
 * @return {[object]} 200 - A list of JSON objects containing the acronyms
 * @example GET /api/acronym
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
    Acronym.find({}).sort({ points: -1, reports: 1 }).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

/**
 * GET /api/acronym/:acronym
 * @summary Returns the definitions for a single acronym
 * @param {string} acronym the name of the acronym (case insensitive)
 * @return {[object]} 200 - a list of JSON objects containing acronyms matching the given acronym
 * @example GET /api/acronym/uiuc
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
    Acronym.find({ acronym: acronym }).sort({ points: -1, reports: 1 }).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

/**
 * POST /api/acronym
 * @summary Inserts new acronym-definition pairs
 * @param {[Acronym]} - a list of names and definitions of the new acronyms
 * @return {Object} 201 - a confirmation message and the ids of the inserted acronyms
 * @example POST /api/acronym [{acronym: 'BK', definition: 'Burger King'}]
 * {
 *  message: 'successfully created definitions',
 *  id: ['5fa5d141ec2e5e8ee2b870b2']
 * }
 */
router.post('/', (req, res) => {
    let acronyms = req.body;
    let created = [];
    for (let acronymObject of acronyms) {
        if (!('acronym' in acronymObject) || !('definition' in acronymObject)) {
            return res.status(400).send({ message: 'invalid acronym', id: created });
        }
    }
    for (let acronymObject of acronyms) {
        let acronym = new Acronym(acronymObject);
        created.push(acronym._id.toString());
        acronym.save();
    }
    res.status(201).send({ message: 'successfully created definitions', id: created });
});

/**
 * PUT /api/acronym/:id
 * @summary Updates an existing acronym-definition pair
 * @param {string} id the ID of the acronym
 * @param {object} - the new values for the acronym
 * @return {string} 200 - a confirmation message
 * @example PUT /api/acronym/5fa5d141ec2e5e8ee2b870b2 {definition: 'New Definition'}
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
 * DELETE /api/acronym/:id
 * @summary Deletes an existing acronym-definition pair
 * @param {string} id the ID of the acronym
 * @return {string} 200 - a confirmation message
 * @example DELETE /api/acronym/5fa5d141ec2e5e8ee2b870b2
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