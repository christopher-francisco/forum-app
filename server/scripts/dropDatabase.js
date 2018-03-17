const mongoose = require('../src/mongoose');
const fixtures = require('../test/integration/fixtures');

fixtures.dropDatabase()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(err => {
    console.err(err);
    process.exit(1);
  });

