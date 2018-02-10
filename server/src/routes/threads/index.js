const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    data: [
      {
        "title": "foo",
        "body": "bar",
        "user": "user",
        "comments": [
          {
            "message": "baz",
          }, {
            "message": "qux"
          }
        ],
      }
    ]
  });
});

module.exports = router;
