var mongodb = require('mongodb');

var url = 'mongodb://localhost:27017/example';
mongodb.MongoClient.connect(url, function(error, db) {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  db.collection('sample').insert({ x : 1}, function(error, result) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  });

  db.collection('sample').find().toArray(function(error, docs) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
    docs.forEach(function(doc) {
      console.log(JSON.stringify(doc));
    });
    process.exit(0);
  })
});
