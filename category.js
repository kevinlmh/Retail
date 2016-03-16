var mongoose = require('mongoose');

var categorySchema = {
  _id: {
    type: String
  },
  parent: {
    type: String,
    ref: 'Category'
  },
  ancestors: [{
    type: String,
    ref: 'Category'
  }]
};

module.exports = mongoose.Schema(categorySchema);
exports.categorySchema = categorySchema;
