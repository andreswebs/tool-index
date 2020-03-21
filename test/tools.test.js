const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const server = require('../server');

chai.use(chaiHttp);

// all keys
const all = [
  'title',
  'link',
  'description',
  'tags',
  'id'
];

// helper
function random () {
  return Math.floor(Math.random() * 10000000);
}

describe('VUTTR API', function () {

  //disable timeout
  this.timeout(0);

  context('GET /tools', function () {

    it('should get all tools', function(done) {
      
      chai.request(server)
        .get('/tools')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });

    });

    it('should get tools filtered by tag query parameter', function (done) {

      chai.request(server)
        .get('/tools')
        .query({
          tag: 'test'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
        
    });

  });

  context('POST /tools', function () {

    it('should save a new tool with only required fields (i.e. title)', function (done) {

      chai.request(server)
        .post('/tools')
        .send({
          title: `Test from Chai ${random()}`
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(all);
          done();
        });

    });


    it('should save a new tool with all fields', function (done) {

      chai.request(server)
        .post('/tools')
        .send({
          title: `Test from Chai ${random()}`,
          link: 'https://www.example.com',
          description: 'Tool description here',
          tags: [ 'test', 'another test', 'tag' ]
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys(all);
          console.log(res.body);
          done();
        });

    });

    it('should respond with a 400 error when missing required fields', function (done) {
      chai.request(server)
        .post('/tools')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.be.a('string');
          done();
        });
    });

  });

  context('DELETE /tools/{id}', function () {

    // an id to be deleted in the tests
    let id;

    beforeEach(function (done) {
      // save a new tool before each test
      chai.request(server)
        .post('/tools')
        .send({
          title: `A tool to delete ${random()}`
        })
        .end((err, res) => {
          id = res.body.id;
          done();
        });

    });

    // clean up
    after(function (done) {
      chai.request(server)
        .delete(`/tools/${id}`)
        .end((err, res) => {
          done();
        });
    });

    it('should delete an existing tool', function (done) {
      chai.request(server)
        .delete(`/tools/${id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.be.deep.equal({});
          done();
        });
    });

    it('should respond with a 404 error when deleting an inexistent tool', function (done) {
      
      const inexistentId = random();

      chai.request(server)
        .delete(`/tools/${inexistentId}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('error');
          // publishable message shall include the not found id
          expect(res.body.error).to.include(`${inexistentId}`);
          done();
        });
    });

  });

  context('GET /<inexistent>', function () {

    it('should return a 404 Not Found response for inexistent routes', function (done) {

      chai.request(server)
        .get('/some-inexistent-route')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.include.keys('error');
          expect(res.body.error).to.include('Not Found');
          done();
        });

    });

  });


});