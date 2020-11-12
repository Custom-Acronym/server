var express = require('express')
const { Acronym } = require('../models');

var router = express.Router()

/**
 * PUT /api/report
 * @summary Increments the number of reports for an acronym
 * @param {string} id the ID of the acronym
 * @return {string} 200 - a confirmation message
 * @example PUT /api/report
 * 'successfully reported definition'
 */
router.put('/', (req, res) => {
    let id = req.body.id;
    Acronym.findById(id, function (err, acronym) {
        if (err) {
            return res.status(400).send(err.toString());
        }
        acronym.reports++;
        acronym.save((err) => {
            if (err) {
                return res.status(400).send(err.toString());
            }
        });
    });
    res.send('successfully reported definition');
});

module.exports = router;