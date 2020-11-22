var express = require('express')
const { Acronym } = require('../models');

var router = express.Router()

/**
 * PATCH /api/vote/:id
 * @summary Increments or decrements the number of points for an acronym
 * @param {string} id the ID of the acronym
 * @param {number} vote 1 for upvote, -1 for downvote
 * @return {string} 200 - a confirmation message
 * @example PATCH /api/vote/5fa5d141ec2e5e8ee2b870b2 {vote: 1}
 * 'successfully voted on definition'
 */
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    let vote = +req.fields.vote;
    Acronym.findById(id, function (err, acronym) {
        if (err || acronym == null || ![1, -1].includes(vote)) {
            return res.status(400).send("couldn't save vote");
        }
        acronym.points += vote;
        acronym.save((err) => {
            if (err) {
                return res.status(400).send(err.toString());
            }
            res.send('successfully voted on definition');
        });
    });
});

module.exports = router;