var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);

module.exports = function() {
  var app = express();

  app.get('/', function(req, res) {
    res.send('Hello, world!');
  });

  return app;
}
