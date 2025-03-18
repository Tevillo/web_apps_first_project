module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.stupid_idea);
  res.render('suggestions', { title: 'Suggestion Box', stupid_idea: req.query.stupid_idea });
});

module.exports = router;