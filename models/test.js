var mongodb = require('./db');

mongodb.open( function(err, db) {
	 if (err) {
		return console.log(err);
	 }
	 // 读取 users 集合
	 db.collection('users', function(err, collection) {
		 if (err) {
			mongodb.close();
			return console.log(err);
		 }
		collection.findOne({name: "circle"}, function(err, doc) {
			mongodb.close();
			if (doc) {
				console.log("Circle Log in!");
			} else {
				console.log(err);
			}
		});
	});
});