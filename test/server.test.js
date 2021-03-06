
var util = require('util')
var request = require('supertest')
var app = require('../app')
var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect

chai.should()
chai.use(sinonChai)

request = request(app)

describe('server', function() {

  it('should return 200 if home page loads', function(done) {
    request
      .get('/')
      .accept('application/json')
      .expect(200)
      .end(done)
  })

  it('should return 200 if user created', function(done) {
    request
      .post('/users')
      .accept('application/json')
      .send({
        email: util.format('niftylettuce+%s@gmail.com', new Date().getTime()),
        name: 'Nifty',
        surname: 'Lettuce',
        password: 'abc123'
      })
      .expect(200)
      .end(done)
  })

  it('should return 200 if user retrieved', function(done) {
    var t = new Date().getTime()
    request
      .post('/users')
      .accept('application/json')
      .send({
        email: util.format('niftylettuce+%s@gmail.com', t),
        name: util.format('Nifty+%s', t),
        surname: util.format('Lettuce+%s', t),
        password: util.format('abc123+%s', t)
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        t = new Date().getTime()
        request
          .get(util.format('/users/%s', res.body.id))
          .accept('application/json')
          .expect(200)
          .end(done)
      })
  })

  it('should return 200 if user updated', function(done) {
    var t = new Date().getTime()
    request
      .post('/users')
      .accept('application/json')
      .send({
        email: util.format('niftylettuce+%s@gmail.com', t),
        name: util.format('Nifty+%s', t),
        surname: util.format('Lettuce+%s', t),
        password: util.format('abc123+%s', t)
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        t = new Date().getTime()
        request
          .put(util.format('/users/%s', res.body.id))
          .accept('application/json')
          .send({
            email: util.format('niftylettuce+%s@gmail.com', t),
            name: util.format('Nifty+%s', t),
            surname: util.format('Lettuce+%s', t)
          })
          .expect(200)
          .end(done)
      })
  })

  it('should return 200 if user deleted', function(done) {
    var t = new Date().getTime()
    request
      .post('/users')
      .accept('application/json')
      .send({
        email: util.format('niftylettuce+%s@gmail.com', t),
        name: util.format('Nifty+%s', t),
        surname: util.format('Lettuce+%s', t),
        password: util.format('abc123+%s', t)
      })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        request
          .del(util.format('/users/%s', res.body.id))
          .accept('application/json')
          .expect(200)
          .end(done)
      })
  })

  it('should return 200 if user index loads', function(done) {
    request
      .get('/users')
      .accept('application/json')
      .expect(200, done)
  })

})
