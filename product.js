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

var schema = mongoose.Schema(productSchema);

var currencySymbols = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£'
}

schema.virtual('displayPrice').get(function() {
  return currencySymbols[this.price.currency] + this.price.amount;
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
exports.productSchema = productSchema;
