const mongoose = require('mongoose');
const Acronym = require('./acronym');

/**
 * Connects to the prod or test database
 * @param {boolean} testing true if should use test database, false otherwise
 */
const connectDb = (testing) => {
    let url = testing ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL;
    return mongoose.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
};

module.exports = { Acronym, connectDb };