const express = require('express');

const Thread = require('../../models/Thread');

const router = express.Router();

router.get('/', (req, res, next) => {
  Thread.getAllByUpvoteCount()
    .then(threads => res.json({ data: threads }))
    .catch(err => next(err));
});

module.exports = router;
