const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

const fixtures = require('./fixtures');
const expect = chai.expect;

describe('Threads', () => {
  describe('GET /', () => {
    beforeEach(() => fixtures.seedDatabase());
    afterEach(() => fixtures.dropDatabase());

    it('should return threads with comments ordered by upvotes', async () => {
      return request(app).get('/threads')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.data).to.have.length(2);
          expect(response.body.data[0].title).to.equal('Is Anakin Skywalker actually Darth Vader?');
          expect(response.body.data[1].title).to.equal('Did The Empire did anything wrong?');
        });
    });
  });

  describe('POST /', () => {
    beforeEach(() => fixtures.seedDatabase());
    afterEach(() => fixtures.dropDatabase());

    xit('should return the newly created post', () => {
    });
  });
});
