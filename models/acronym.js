const mongoose = require('mongoose');

/**
 * Represents an acronym
 */
const acronymSchema = new mongoose.Schema(
    {
        acronym: {
            type: String,
            required: true
        },
        definition: {
            type: String,
            required: true
        },
    }
);

const Acronym = mongoose.model('Acronym', acronymSchema);

module.exports = Acronym;