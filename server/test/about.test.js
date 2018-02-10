const app = require('../src/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Endpoint /about ', () => {
  describe('GET /', () => {
    it('gets the app name and version', () => {
      return request(app).get('/about')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body).to.deep.equal({
              name: process.env.npm_package_name,
              version: process.env.npm_package_version
            });
        });
    });
  });
});
