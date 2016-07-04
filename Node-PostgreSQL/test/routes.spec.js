process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var logger = require('winston');
var knex = require('../db/knex');
var should = chai.should();
chai.use(chaiHttp);
describe('API Routes', function() {
    // beforeEach(function(done) {});
    // afterEach(function(done) {});
    describe('GET /api/jobbatical/topActiveUsers?pageNumber={pageNumber}', function() {
        it('should return all top active users', function(done) {
            chai.request(server).get('/api/jobbatical/topActiveUsers?pageNumber=1').end(function(err, res) {
                res.should.have.status(200);
                res.error.should.be.equal(false);
                res.should.be.json; // jshint ignore:line
                res.text.message.should.be.a('string');
                // res.body.should.be.a('array');
                done();
            });
        });
    });
    describe('GET /api/jobbatical/users?id={user.id}', function() {
        it('should return details for a user', function(done) {
            chai.request(server).get('/api/jobbatical/users?id=2').end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                // res.body.should.be.json; // jshint ignore:line
                // res.body.should.have.property('id');
                // res.body.should.have.property('name');
                // res.body.should.have.property('created_at');
                // res.body.should.have.property('companies');
                // res.body.should.have.property('createdListings');
                // res.body.should.have.property('applications');
                // res.body.id.should.be.a('integer');
                // res.body.name.should.be.a('string');
                // res.body.created_at.should.be.a('date');
                // res.body.companies.should.be.a('array');
                // res.body.createdListings.should.be.a('array');
                // res.body.applications.should.be.a('array');
                done();
            });
        });
    });
});