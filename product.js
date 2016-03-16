var mongoose = require('mongoose');
var Category = require('./category');

var productSchema = {
  name: {
    type: String,
    required: true
  },
  pictures: [{
    type: String,
    // pictures must start with http://
    match: /^http:\/\//i
  }],
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      // only three currencies supported for now
      enum: ['USD', 'EUR', 'GPB'],
      required: true
    }
  },
  category: Category.categorySchema
};

module.exports = mongoose.Schema(productSchema);
exports.productSchema = productSchema;
