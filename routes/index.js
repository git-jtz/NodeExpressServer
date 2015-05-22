var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'BigCat', layout: '_layout' });
});
router.get('/list', function(req, res) {
  res.render('list', { 
  title: 'List',
  items: [1991, 'byvoid', 'express', 'Node.js']
  });
});
router.get('/hello', function(req, res){
	res.send('The date is: ' + new Date().toString());
})
module.exports = router;
