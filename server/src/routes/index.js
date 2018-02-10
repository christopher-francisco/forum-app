var express = require('express');
var router = express.Router();

router.get('/about', function(req, res, next) {
  res.json({
    name: process.env.npm_package_name,
    version: process.env.npm_package_version,
  })
});

module.exports = router;
