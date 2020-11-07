const express = require('express');
const { Acronym, connectDb } = require('./models');

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    Acronym.find({}).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

// TODO: case insensitive
app.get('/:acronym', (req, res) => {
    Acronym.findOne({ acronym: req.params.acronym }).exec(function (err, definitions) {
        if (err) {
            return res.status(400).end();
        }
        res.json(definitions);
    });
});

app.post('/', (req, res) => {
    let acronym = new Acronym(req.body);
    acronym.save((err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send('success');
    });
});

app.put('/:id', (req, res) => {
    Acronym.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send('success');
    });
});

app.delete('/:id', (req, res) => {
    Acronym.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send('success');
    });
});

connectDb().then(async () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
        console.log(`server listening on port ${PORT}!`),
    );
});