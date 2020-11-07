const mongoose = require('mongoose');

const acronymSchema = new mongoose.Schema(
    {
        acronym: String,
        definition: String,
    }
);

const Acronym = mongoose.model('Acronym', acronymSchema);

module.exports = Acronym;