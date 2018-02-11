const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const mongooseHelpers = require('../../helpers/mongoose-helper');
const rewireHelper = require('../../helpers/rewire-helper');

chai.use(chaiAsPromised);

const User = require('rewire')('../../../src/models/User');
let isEmail = null;

describe('User', () => {
  before(mongooseHelpers.connectToDatabase);

  after(mongooseHelpers.closeConnection);

  beforeEach(() => {
    isEmailSpy = rewireHelper.createSinonSpyOnDependencyFunction(User, 'validator', 'isEmail');
  });

  afterEach(() => {
    isEmailSpy.restore();
  });

  it('should not save if required fields are not present', () => {
    const user = new User();

    return expect(user.save()).to.be.rejected
      .then(err => {
        expect(err).to.exist;

        expect(err.errors).to.have.property('displayName');
        expect(err.errors).to.have.property('email');
        expect(err.errors).to.have.property('password');
      });
  });

  it('should not save if email isn\'t valid', () => {
    const user = new User({
      displayName: 'Foo',
      email: 'Bar',
      password: 'Baz',
    });

    return expect(user.save()).to.be.rejected
      .then(err => {
        expect(err).to.exist;

        expect(err.errors).to.have.property('email');
        expect(isEmailSpy).to.be.calledOnce;
      });
  });

  /**
   * @see https://stackoverflow.com/questions/48778194/how-to-handle-unique-indexes-with-mongoose
   */
  xit('should not save user with duplicate email', () => {
    const userA = new User({
      displayName: 'A',
      email: 'a@mail.com',
      password: 'a',
    });

    const duplicatedUserA = new User({
      displayName: 'A',
      email: 'a@mail.com',
      password: 'a',
    });

    const promiseChain = userA.save()
      .then(() => duplicatedUserA.save());

    return expect(promiseChain).to.be.rejected
      .then(err => {
        expect(err).to.exist;

        expect(err.errors).to.have.property('email');
      });
  });

 it('should save a user', () => {
    const user = new User({
      displayName: 'Foo',
      email: 'bar@mail.com',
      password: 'baz',
    });

    return user.save();
  });
});
