
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Server Test', () => {
    beforeEach((done) => {
         
    });
  /*
  * Test the /POST route
  */
  describe('/POST api/space ', () => {
      it('it should POST with empty body', (done) => {
                                                                                                                                                
        chai.request(server)
            .post('/api/space')
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('pages');
                res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });

  });
});