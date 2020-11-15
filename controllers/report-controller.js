var express = require('express')
const { Acronym } = require('../models');

var router = express.Router()

/**
 * PATCH /api/report/:id
 * @summary Increments the number of reports for an acronym
 * @param {string} id the ID of the acronym
 * @return {string} 200 - a confirmation message
 * @example PATCH /api/report/5fa5d141ec2e5e8ee2b870b2
 * 'successfully reported definition'
 */
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    Acronym.findById(id, function (err, acronym) {
        if (err || acronym == null) {
            return res.status(400).send("couldn't report definition");
        }
        acronym.reports++;
        acronym.save((err) => {
            if (err) {
                return res.status(400).send(err.toString());
            }
            res.send('successfully reported definition');
        });
    });
});

module.exports = router;