var assert = require('assert');
var superagent = require('superagent');
var app = require('./server');

describe('server', function() {
  var server;

  beforeEach(function() {
    server = app().listen(3000);
  });

  afterEach(function() {
    server.close();
  });

  it('Sends back "Hello, world!" when user requests /', function(done) {
    superagent.get('http://localhost:3000/', function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.text, "Hello, world!");
      done();
    });
  });

  it('Displays welcom with correct username and option when connect to /user', function(done) {
    superagent.get('http://localhost:3000/user/minghui?option=abc', function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.text, "Welcome minghui! Option: abc");
      done();
    });
  });
});
