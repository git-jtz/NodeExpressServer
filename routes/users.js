var express = require('express');
var router = express.Router();

var default_user = {
	'1' : {
		name: 'cat',
		nickname: 'circle'
	},
	'2' : {}
	
};
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.all('/:userid', function(req, res, next){
	if(default_user[req.params.userid])
		res.send(default_user[req.params.userid]);
	else
		next(new Error(req.params.userid + ' does not exist.'));
});
router.get('/:userid', function(req, res){
	res.send('The user you want is: ' + default_user[req.params.userid].nickname);
});

module.exports = router;
