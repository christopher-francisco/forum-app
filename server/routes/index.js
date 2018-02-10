var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    version: process.env.npm_package_version,
  })
});

module.exports = router;
