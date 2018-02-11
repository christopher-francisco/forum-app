const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;

const mongooseHelpers = require('../../helpers/mongoose-helper');

chai.use(chaiAsPromised);

const Vote = require('../../../src/models/Vote');

describe('Vote', () => {
  before(mongooseHelpers.connectToDatabase);
  after(mongooseHelpers.closeConnection);

  describe('Validation', () => {
    it('should not save if the Vote required fields are not present', () => {
      const vote = new Vote();

      return expect(vote.save()).to.be.rejected
        .then(err => {
          expect(err).to.exist;

          expect(err.errors).to.have.property('user');
          expect(err.errors).to.have.property('thread');
          expect(err.errors).to.have.property('value');
        });
    });

    it('should not save if `value` field is not 1 or -1', () => {
      const vote = new Vote({
        user: mongooseHelpers.newMongoObjectId(),
        thread: mongooseHelpers.newMongoObjectId(),
        value: 2,
      });

      return expect(vote.save()).to.be.rejected
        .then(err => {
          expect(err).to.exist;

          expect(err.errors).to.have.property('value');
          expect(err.errors.value.message).to.match(/Validator failed/);
        });
    });

    it('should save a Vote', () => {
      const vote = new Vote({
        user: mongooseHelpers.newMongoObjectId(),
        thread: mongooseHelpers.newMongoObjectId(),
        value: 1,
      });

      return vote.save();
    });
  });
});
