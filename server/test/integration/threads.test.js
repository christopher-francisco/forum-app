const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const initialThreads = [{
  "title": "foo",
  "body": "bar",
  "user": "user",
  "comments": [
    {
      "message": "baz",
    }, {
      "message": "qux"
    }
  ],
}];

describe('Endpoint /threads', () => {
  describe('GET /', () => {
    it('gets threads with comments ordered by upvotes', async () => {
      return request(app).get('/threads')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal({
            data: initialThreads,
          });
        });
    });
  });
});
