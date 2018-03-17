const mongoose = require('mongoose');

/**
 * Call this in the `before()` callback of each test
 */
function connectToDatabase() {
  if (mongoose.connections.db) {
    return Promise.resolve();
  }

  // TODO: unify this connection string with the app's one
  return mongoose.connect('mongodb://localhost:27017/forum-app-test')
    .catch(err => {
      // TODO: Throw a mocha-friendly error as this get's caught as an unhandled
      // promise rejection.
      throw new Error('Couldn\'t connect to MongoDB. Make sure it\'s running');
    });
}

/**
 * Call this in the `after()` callback of each test.
 * @see https://github.com/Automattic/mongoose/issues/1251
 */
function closeConnection() {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  return mongoose.connection.db.dropDatabase()
    .then(() => mongoose.connection.close());
};

function newMongoObjectId() {
  return mongoose.Types.ObjectId();
}

module.exports = {
  connectToDatabase,
  closeConnection,
  newMongoObjectId,
};
