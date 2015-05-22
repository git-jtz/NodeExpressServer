var express = require('express');
var router = express.Router();
var url = require('url');
var mongodb = require('../models/db');
var bodyParser = require('body-parser');
var authenticate = require('../api/oauth');
var syncFile = require('../api/sync');

router.get('/reg', function(req, res) {
  //res.send('respond with a resource');
});

router.get('/token', function(req, res) {
	authenticate(function(tokenJSON){
		res.send(tokenJSON);
	});
	
});

router.get('/sync', function(req, res) {
  var params = url.parse(req.url, true)
  var u = params.query.username;
  var p = params.query.password;
  var id = params.query.id
  var filename = params.query.itemname;
  
  
  authenticate(u, p, function(tokenJSON){
	var success = syncFile(tokenJSON, id, filename, function(success){
		if(success)
			res.jsonp({status : true});
		else res.jsonp({status : false});
	});
	
  }); 
  
  //var status = sfSync(username, password);
  
});
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

//API calling from Durandal
router.get('/remotelogin', function(req, res){
	
	var params = url.parse(req.url, true)
	var u = params.query.username;
	var p = params.query.password;
	var cb = params.query.callback;
	var success = false;
	
	mongodb.open( function(err, db) {
	 if (err) {
		res.jsonp({status: false, errCode: -1, errMsg: err});
		return false;
	 }
	 // 读取 users 集合
	 db.collection('users', function(err, collection) {
		 if (err) {
			mongodb.close();
			res.jsonp({status: false, errCode: 0, errMsg: err});
		 }
		collection.findOne({name: u}, function(err, doc) {
			mongodb.close();
			if (doc) {
				if(doc.name == u && doc.password == p)
					res.jsonp({status: true});
				else res.jsonp({status: false, errCode: 1, errMsg: 'Password is incorrect.'});
				//console.log("Circle Log in!");
			} else {
				res.jsonp({status: false, errCode: 2, errMsg: 'No such user.'});
			}
		});
	});
	});
});

router.post('/login', function(req, res) {
  //res.send('respond with a resource');
});

router.get('/logout', function(req, res) {
  //res.send('respond with a resource');
});
module.exports = router;
