var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/example');

  var Category = mongoose.model('Category', require('./category'), 'categories');
  var Product = mongoose.model('Product', require('./product'), 'products');

  var models = {
    Category: Category,
    Product: Product
  }

  // For each model, register a factory
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
