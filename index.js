var mongoose = require('mongoose');
var schema = require('./schema');

var url = 'mongodb://localhost:27017/example';
mongoose.connect(url);

var User = mongoose.model('User', schema, 'users');

var user = new User({
  name: 'John Doe',
  email: 'john.doe@test.com'
});

user.save(function(error) {
  if (error) {
    console.log(error);
    process.exit(1);
  }
  User.find({ name: 'John Doe' }, function(error, docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    console.log(require('util').inspect(docs));
    process.exit(0);
  });
});
