var app = require('../index');
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe('vote on definitions', () => {
    it('should upvote definitions', (done) => {
        let id = '5faf0231f286dc05f848f5ec';
        chai.request(app)
            .patch('/api/vote/' + id)
            .send({ vote: '1' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('successfully voted on definition');
                done();
            });
    });

    it('should downvote definitions', (done) => {
        let id = '5faf0231f286dc05f848f5ec';
        chai.request(app)
            .patch('/api/vote/' + id)
            .send({ vote: '-1' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('successfully voted on definition');
                done();
            });
    });

    it('should handle invalid vote amounts', (done) => {
        let id = '5faf0231f286dc05f848f5ec';
        chai.request(app)
            .patch('/api/vote/' + id)
            .send({ vote: '2' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('couldn\'t save vote');
                done();
            });
    });

    it('should handle missing data', (done) => {
        let id = '5faf0231f286dc05f848f5ec';
        chai.request(app)
            .patch('/api/vote/' + id)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('couldn\'t save vote');
                done();
            });
    });

    it('should handle invalid definitions', (done) => {
        let id = 'invalid';
        chai.request(app)
            .patch('/api/vote/' + id)
            .send({ vote: '-1' })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('couldn\'t save vote');
                done();
            });
    });
});