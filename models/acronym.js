const mongoose = require('mongoose');

/**
 * Represents an acronym
 */
const acronymSchema = new mongoose.Schema(
    {
        /**
         * The acronym or abbreviation.
         * eg. UIUC, LOL, etc.
         */
        acronym: {
            type: String,
            required: true
        },

        /**
         * A definition for an acronym.
         */
        definition: {
            type: String,
            required: true
        },

        /**
         * The number of reports for a definition.
         */
        reports: {
            type: Number,
            required: true,
            default: 0
        },

        /**
         * The number of points for a definition.
         */
        points: {
            type: Number,
            required: true,
            default: 0
        },
    }
);

const Acronym = mongoose.model('Acronym', acronymSchema);

module.exports = Acronym;