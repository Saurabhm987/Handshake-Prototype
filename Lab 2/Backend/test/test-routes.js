var chai = require('chai');
var chaiHttp = require('chai-http');;
var should = chai.should();
var server = require('../index.js')
chai.use(chaiHttp);


  it('add skill should return an object', function(done) {
    chai.request(server)
      .get('/getDetails/companyInfo')
      .send({ params: { email:"saurabh@gmail.com"}})
      .end(function(err, res){
        res.should.have.status(200)
        res.body.should.have.property('email')
        done();
      });
  });