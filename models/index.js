const mongoose = require('mongoose');
const Acronym = require('./acronym');

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