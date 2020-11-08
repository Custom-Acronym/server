const express = require('express');
const { connectDb } = require('./models');
const router = require('./controllers/acronym-controller');

const app = express();
app.use(express.json());
app.use('/api', router);

let testing = process.argv[1].includes('mocha');
connectDb(testing).then(async () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        !testing && console.log(`server listening on port ${PORT}!`)
    );
});

module.exports = app;