var express = require('express');
var router = express.Router();

router.get('/pens', function(req, res){
  res.send('this is the data for the pens!');
});

router.get('/stamps', function(req, res){
  res.send('this is the data for the stamps!');
});

router.get('/leather', function(req, res){
  res.send('this is the data for the leather products!');
});

router.get('/jewelry', function(req, res) {
    res.send('this is the data for the jewelry products!');
});

module.exports = router;