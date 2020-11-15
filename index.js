const express = require('express');
const { connectDb } = require('./models');
const acronymRouter = require('./controllers/acronym-controller');
const reportRouter = require('./controllers/report-controller');
const voteRouter = require('./controllers/vote-controller');

const app = express();
app.use(express.json());
app.use('/api/acronym', acronymRouter);
app.use('/api/report', reportRouter);
app.use('/api/vote', voteRouter);

/**
 * Connect to the database and start the server
 */
let testing = process.argv[1].includes('mocha');
connectDb(testing).then(async () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        !testing && console.log(`server listening on port ${PORT}!`)
    );
});

module.exports = app;