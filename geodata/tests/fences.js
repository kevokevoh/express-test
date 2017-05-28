var request = require('supertest');
describe('Express test', function () {
    var server;
    beforeEach(function () {
        delete require.cache[require.resolve('./../app')];
        server = require('./../app');
    });
    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });
    it('Post successfully to /api/fences', function testPost(done) {
        request(server)
            .post('/api/fences')
        	.send({name:"The cool Place",location:[34,25],radius:4500})
            .expect(200, done);
    });
    it('Post unsuccessfully to /api/fences', function testPost(done) {
        request(server)
            .post('/api/fences')
        	.send({latitude: 71.518, longitude: 107.45425, radius:5000})
            .expect(500, done);
    });
    it('Post without radius to /api/fences', function testPost(done) {
        request(server)
            .post('/api/fences')
        	.send({name:"The cool Place",location:[34,25]})
            .expect(400, done);
    });
    it('Post with wrong latitude to /api/fences', function testPost(done) {
        request(server)
            .post('/api/fences')
        	.send({name:"The cool Place",location:[34,125],radius:4500})
            .expect(400, done);
    });
    it('Post with wrong longitude to /api/fences', function testPost(done) {
        request(server)
            .post('/api/fences')
        	.send({name:"The cool Place",location:[234,25],radius:4500})
            .expect(400, done);
    });
    it('Post with wrong longitude and longitude to /api/fences', function testPost(
        done) {
        request(server)
            .post('/api/fences')
        	.send({name:"The cool Place",location:[234,125],radius:4500})
            .expect(400, done);
    });
    
});
