'use strict'

const assert = require('assert')
const login = require('../controllers/login')

describe('Login controller', function () {
  it('should respond with success message', function (done) {
    login.login({user: {token: 'asdf'}}, {send: function (response) {
      assert.equal(response.success, true)
      assert.equal(response.message, 'Successfully logged in')
      assert.equal(response.accessToken, 'asdf')
      done()
    }})
  })
})
