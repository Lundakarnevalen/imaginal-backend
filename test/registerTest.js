const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user) => describe('API /register', function () {
  it('should create a user', done => {
    api.post('/register')
      .send(user)
      .expect(200, done)
  })

  it('should allow only one user per email', done => {
    const user = {
      'email': 'test@gmail.com',
      'personalNumber': 'ABCDEFGHIJ',
      'password': 'password'
    }
    api.post('/register')
      .send(user)
      .expect(409, done)
  })

  it('should allow only one user per personal number', done => {
    const user = {
      'email': 'test@gmail.com',
      'personalNumber': '0123456789',
      'password': 'password'
    }
    api.post('/register')
      .send(user)
      .expect(409, done)
  })

  it('should tell if email is missing', done => {
    const user = {
      'notEmail': 'test@gmail.com',
      'personalNumber': '0123456789',
      'password': 'password'
    }
    api.post('/register')
      .send(user)
      .expect({
        success: false,
        message: 'Invalid parameters',
        error: ['email']
      })
      .expect(400, done)
  })
  it('No personal number set', done => {
    const user = {
      'email': 'test@gmail.com',
      'password': 'password'
    }
    api.post('/register')
      .send(user)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
  it('Short personalnumber', done => {
    const user = {
      'email': 'test@gmail.com',
      'personalNumber': '01234567',
      'password': 'password'
    }
    api.post('/register')
      .send(user)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
  it('No password', done => {
    const user = {
      'email': 'test@gmail.com',
      'personalNumber': '01234567'
    }
    api.post('/register')
      .send(user)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
})
