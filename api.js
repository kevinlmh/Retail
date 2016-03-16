var express = require('express');

module.exports = function(wagner) {
  var api = express.Router();

  api.get('category/id/:id', wagner.invoke(function(Category) {
    return function(req, res) {
      Category.findOne({ _id: req.param.id }, function(error, category) {
        if (error) {
          return res.status(500).json({ error: error.toString() });
        }
        if (!category) {
          return res.status(404).json({ error: 'Not found' });
        }
        res.json({ category: category });
      });
    };
  }));

  api.get('category/parent/:id', wagner.invoke(function(Category) {
    return function(req, res) {
      Category.find({ parent: req.param.id }).sort({ _id: 1 }).exec(function(error, categories) {
        if (error) {
          return res.status(500).json({ error: error.toString() });
        }
        res.json({ categories: categories });
      });
    };
  }));

  return api;
};
