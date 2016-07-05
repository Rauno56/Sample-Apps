process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var logger = require('winston');
var knex = require('../db/knex');
var should = chai.should();
chai.use(chaiHttp);
describe('API Routes', function() {
    describe('GET /api/jobbatical/topActiveUsers?pageNumber={pageNumber}', function() {
        it('should return error object for pageNumber Undefined', function(done) {
            chai.request(server).get('/api/jobbatical/topActiveUsers').end(function(err, res, body) {
                res.should.have.status(401);
                done();
            });
        });
        it('should return error object for pageNumber invalid', function(done) {
            chai.request(server).get('/api/jobbatical/topActiveUsers?pageNumber=-1').end(function(err, res) {
                res.should.have.status(402);
                done();
            });
        });
        it('should return all top active users of past week', function(done) {
            chai.request(server).get('/api/jobbatical/topActiveUsers?pageNumber=1').end(function(err, res) {
                res.should.have.status(200);
                res.error.should.be.equal(false);
                res.should.be.json;
                done();
            });
        });
    });
    describe('GET /api/jobbatical/users?id={user.id}', function() {
        it('should return error for user id undefined', function(done) {
            chai.request(server).get('/api/jobbatical/users').end(function(err, res) {
                res.should.have.status(401);
                done();
            });
        });
        it('should return error object for user id invalid', function(done) {
            chai.request(server).get('/api/jobbatical/users?id=-2').end(function(err, res) {
                res.should.have.status(402);
                done();
            });
        });
        it('should return details for a user', function(done) {
            chai.request(server).get('/api/jobbatical/users?id=2').end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });
});