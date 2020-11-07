const express = require('express');
const { connectDb } = require('./models');
const router = require('./controllers/acronym-controller');

const app = express();
app.use(express.json());
app.use('/api', router);

connectDb().then(async () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        console.log(`server listening on port ${PORT}!`),
    );
});