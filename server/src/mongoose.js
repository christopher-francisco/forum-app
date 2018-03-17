const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoURL);

module.exports = mongoose;
