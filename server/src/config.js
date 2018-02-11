const path = require('path');
const dotenv = require('dotenv');

const dotenvFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const dotenvPath = path.resolve(process.cwd(), dotenvFile);

const result = dotenv.config({ path: dotenvPath });

if (result.error) {
  throw result.error;
};

module.exports = {
  env: process.env.NODE_ENV,
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/forum-app',
  port: process.env.PORT || 3001,
};
