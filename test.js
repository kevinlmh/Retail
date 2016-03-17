var express = require('express');
var assert = require('assert');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Category API', function() {
  var server;
  var Category;

  before(function() {
    var app = express();
    // Bootstrap server
    models = require('./models')(wagner);
    app.use(require('./api')(wagner));
    server = app.listen(3000);
    // Make category model available in tests
    Category = models.Category;
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure categories are empty before each tests
    Category.remove({}, function(error) {
      assert.ifError(error);
      done();
    });
  });

  it('Can load a category by id', function(done) {
    // Create a category
    Category.create({ _id: 'Electronics' }, function(error, doc) {
      assert.ifError(error);
      var url = URL_ROOT + '/category/id/Electronics';
      // Make a GET request to localhost:3000/category/id/Electronics
      superagent.get(url, function(error, res) {
        assert.ifError(error);
        var result;
        // We should get { _id: 'Electronics' } back
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.ok(result.category);
        assert.equal(result.category._id, 'Electronics');
        done();
      });
    });
  });

  it('Can load all categories that have specified parent', function(done) {
    var categories = [
      { _id: 'Electronics' },
      { _id: 'Phones', parent: 'Electronics' },
      { _id: 'Laptops', parent: 'Electronics' },
      { _id: 'Bacon' }
    ];
    // Create some categories
    Category.create(categories, function(error, categories) {
      var url = URL_ROOT + '/category/parent/Electronics';
      // Make an HTTP request to localhost:3000/category/parent/Electronics
      superagent.get(url, function(error, res) {
        assert.ifError(error);
        var result;
        assert.doesNotThrow(function() {
          result = JSON.parse(res.text);
        });
        assert.equal(result.categories.length, 2);
        // Results should be sorted in ascending order by _id
        assert.equal(result.categories[0]._id, 'Laptops');
        assert.equal(result.categories[1]._id, 'Phones');
        done();
      });
    });
  });
});
