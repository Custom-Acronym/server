var app = require('../index');
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe('read acronyms', () => {
    it('should not serve anything at /', (done) => {
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

    it('should be case insensitive', (done) => {
        chai.request(app)
            .get('/api/BK')
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
                expect(res.text).to.equal('successfully created acronym');
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

// describe('update acronyms', () => {
//     it('should update an acronym', (done) => {

//     });
// });