const should = require('chai').should()
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const users = require('../models/users').User

describe('API /register', function () {
  const testUser = {
    'email': 'test@gmail.com',
    'personalNumber': '0123459789',
    'password': 'password'
  }

  before(async () => {
    await users.destroy({
      where: {
        $or: [{personalNumber: testUser.personalNumber}, {email: testUser.email}]
      }
    })
  })

  it('should create a user', done => {
    api.post('/register')
      .send(testUser)
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
      'email': 'newEmail@',
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
})
