
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Server Test', () => {

    var url = 'http://localhost:3000'; //server should be up and running

    beforeEach((done) => {
         done();
    });
  /*
  * Test the /POST route
  */
  describe('/POST api/space ', () => {
      it('it should POST with empty body and get back status 200 with message Request timeout', (done) => {
        chai.request(url)
            .post('/api/space')
            .send({})
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.equal('RequestTimedOutError: Request timed out');
              done();
            });
      });

  });
});