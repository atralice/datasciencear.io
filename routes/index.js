var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Science Ar', pagina: 'home/landing' });
});

router.get('/aboutus', function(req, res, next) {
  res.render('index', { title: 'Nosotros', pagina: 'home/aboutus' });
});

module.exports = router;
