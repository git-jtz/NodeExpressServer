var settings = require('../settings');
var DB = require('mongodb').Db;
//var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new DB(settings.db, new Server(settings.host, settings.port, {}));
/* MongoClient.connect('mongodb://localhost:27017/microblog', function(err, db){
	test.equal(null, err);
	exportDB = db;
});

module.exports = exportDB; */
