"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_http_1 = __importDefault(require("chai-http"));
var expect = chai_1.default.expect;
var server_1 = __importDefault(require("../src/server"));
chai_1.default.use(chai_http_1.default);
var all = ['title', 'link', 'description', 'tags', 'id'];
function random() {
    return Math.floor(Math.random() * 10000000);
}
describe('API', function () {
    this.timeout(0);
    context('GET /tools', function () {
        it('should get all tools', function (done) {
            chai_1.default
                .request(server_1.default)
                .get('/tools')
                .end(function (_err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
        it('should get tools filtered by tag query parameter', function (done) {
            chai_1.default
                .request(server_1.default)
                .get('/tools')
                .query({
                tag: 'test',
            })
                .end(function (_err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
        });
    });
    context('POST /tools', function () {
        it('should save a new tool with only required fields (i.e. title)', function (done) {
            chai_1.default
                .request(server_1.default)
                .post('/tools')
                .send({
                title: "Test from Chai ".concat(random()),
            })
                .end(function (_err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys(all);
                done();
            });
        });
        it('should save a new tool with all fields', function (done) {
            chai_1.default
                .request(server_1.default)
                .post('/tools')
                .send({
                title: "Test from Chai ".concat(random()),
                link: 'https://www.example.com',
                description: 'Tool description here',
                tags: ['test', 'another test', 'tag'],
            })
                .end(function (_err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys(all);
                done();
            });
        });
        it('should respond with a 400 error when missing required fields', function (done) {
            chai_1.default
                .request(server_1.default)
                .post('/tools')
                .send({})
                .end(function (_err, res) {
                expect(res.status).to.equal(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys('error');
                expect(res.body.error).to.be.a('string');
                done();
            });
        });
    });
    context('DELETE /tools/{id}', function () {
        var id;
        beforeEach(function (done) {
            chai_1.default
                .request(server_1.default)
                .post('/tools')
                .send({
                title: "A tool to delete ".concat(random()),
            })
                .end(function (_err, res) {
                id = res.body.id;
                done();
            });
        });
        after(function (done) {
            chai_1.default
                .request(server_1.default)
                .delete("/tools/".concat(id))
                .end(function () {
                done();
            });
        });
        it('should delete an existing tool', function (done) {
            chai_1.default
                .request(server_1.default)
                .delete("/tools/".concat(id))
                .end(function (_err, res) {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.be.deep.equal({});
                done();
            });
        });
        it('should respond with a 404 error when deleting an inexistent tool', function (done) {
            var inexistentId = random();
            chai_1.default
                .request(server_1.default)
                .delete("/tools/".concat(inexistentId))
                .end(function (_err, res) {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.include.keys('error');
                expect(res.body.error).to.include("".concat(inexistentId));
                done();
            });
        });
    });
    context('GET /<inexistent>', function () {
        it('should return a 404 Not Found response for inexistent routes', function (done) {
            chai_1.default
                .request(server_1.default)
                .get('/some-inexistent-route')
                .end(function (_err, res) {
                expect(res.status).to.equal(404);
                expect(res.body).to.include.keys('error');
                expect(res.body.error).to.include('Not Found');
                done();
            });
        });
    });
});
