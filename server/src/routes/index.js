const express = require('express');
const aboutRouter = require('./about');
const threadsRouter = require('./threads');

const router = express.Router();

router.use('/about', aboutRouter);
router.use('/threads', threadsRouter)

module.exports = router;
