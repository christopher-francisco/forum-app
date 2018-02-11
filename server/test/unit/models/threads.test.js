const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const mongooseHelpers = require('../../helpers/mongoose-helper');
const rewireHelper = require('../../helpers/rewire-helper');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const Thread = require('rewire')('../../../src/models/Thread');

const slugSpy = rewireHelper.createSinonSpyOnDependency(Thread, 'slug');

describe('Thread', () => {
  before(mongooseHelpers.connectToDatabase);

  after(mongooseHelpers.closeConnection);

  describe('Validation', () => {
    it('should not save if the Thread required fields are not present', () => {
      const thread = new Thread();

      return expect(thread.save()).to.be.rejected
        .then(err => {
          expect(err).to.exist;

          expect(err.errors).to.have.property('title');
          expect(err.errors).to.have.property('body');
          expect(err.errors).to.have.property('user');
        });
    });

    it('should save a thread', () => {
      const thread = new Thread({
        title: 'Foo',
        body: 'Bar',
        user: mongooseHelpers.newMongoObjectId(),
      });

      return thread.save()
        .then(() => {
          expect(slugSpy).calledOnce;
        });
    });
  })
});
