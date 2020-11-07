const mongoose = require('mongoose');
const Acronym = require('./acronym');

const connectDb = () => {
    return mongoose.connect(
        process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
};

module.exports = { Acronym, connectDb };