var app = require('../index');
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe('read acronyms', () => {
    it('should not serve anything at root', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('should fetch all acronyms', (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.length.greaterThan(0);
                done();
            });
    });

    it('should fetch a single acronym', (done) => {
        chai.request(app)
            .get('/api/bk')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.length.greaterThan(0);
                expect(res.body[0].acronym).to.equal('BK');
                expect(res.body[0].definition).to.equal('Burger King');
                done();
            });
    });

    it('should return empty list if not found', (done) => {
        chai.request(app)
            .get('/api/invalid')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.length).to.equal(0);
                done();
            });
    });

    it('should be case insensitive', (done) => {
        chai.request(app)
            .get('/api/Bk')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.length.greaterThan(0);
                expect(res.body[0].acronym).to.equal('BK');
                expect(res.body[0].definition).to.equal('Burger King');
                done();
            });
    });
});

describe('create acronyms', () => {
    it('should insert an acronym', (done) => {
        let acronym = {
            acronym: 'TEST',
            definition: 'test definition'
        };
        chai.request(app)
            .post('/api')
            .send(acronym)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.message).to.equal('successfully created definition');
                done();
            });
    });

    it('should require both fields', (done) => {
        let acronym = {
            definition: 'test definition'
        };
        chai.request(app)
            .post('/api')
            .send(acronym)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.text).to.equal('Acronym validation failed');
                done();
            });
    });
});

describe('update acronyms', () => {
    it('should update an acronym', (done) => {
        let id = '5fa5d141ec2e5e8ee2b870b2';
        let update = {
            definition: 'new definition'
        };
        chai.request(app)
            .put('/api/' + id)
            .send(update)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.equal('successfully updated definition');
                done();
            });
    });

    it('should return error if invalid', (done) => {
        let id = 'invalid';
        let update = {
            definition: 'new definition'
        };
        chai.request(app)
            .put('/api/' + id)
            .send(update)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.text).to.equal('CastError: Cast to ObjectId failed for value "invalid" at path "_id" for model "Acronym"');
                done();
            });
    });
});

describe('delete acronyms', () => {
    it('should delete acronyms', (done) => {
        let acronym = {
            acronym: 'DEL',
            definition: 'to be deleted'
        };
        chai.request(app)
            .post('/api')
            .send(acronym)
            .end((err, res) => {
                let id = res.body.id;
                chai.request(app)
                    .delete('/api/' + id)
                    .end((err, res) => {
                        expect(err).to.be.null;
                        expect(res).to.have.status(200);
                        expect(res.text).to.equal('successfully deleted definition');
                        done();
                    });
            });
    });

    it('should return error if invalid', (done) => {
        let id = 'invalid';
        chai.request(app)
            .delete('/api/' + id)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.text).to.equal('CastError: Cast to ObjectId failed for value "invalid" at path "_id" for model "Acronym"');
                done();
            });
    });
});