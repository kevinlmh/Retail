var mongoose = require('mongoose');
var Category = require('./category');
var fx = require('./fx');

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
      required: true,
      set: function(p) {
        this.internal.approximatePriceUSD = p / (fx()[this.price.currency] || 1);
        return p;
      }
    },
    currency: {
      type: String,
      // only three currencies supported for now
      enum: ['USD', 'EUR', 'GPB'],
      required: true,
      set: function(c) {
        this.internal.approximatePriceUSD = this.price.amount / (fx()[c] || 1);
        return c;
      }
    }
  },
  category: Category.categorySchema,
  internal: {
    approximatePriceUSD: Number
  }
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
