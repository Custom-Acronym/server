var app = require('../index');
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe('report definitions', () => {
    it('should report definitions', (done) => {
        let id = '5faf0231f286dc05f848f5ec';
        chai.request(app)
            .patch('/api/report/' + id)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('successfully reported definition');
                done();
            });
    });

    it('should handle errors', (done) => {
        let id = 'invalid';
        chai.request(app)
            .patch('/api/report/' + id)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('couldn\'t report definition');
                done();
            });
    });
});