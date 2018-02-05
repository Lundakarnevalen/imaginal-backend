const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user) => describe('API /login/email', function () {
  it('should login the user', done => {
    api.post('/login/email')
      .send({email: user.email, password: user.password})
      .end(async(err, res) => {
        user.token = res.body.accessToken
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
})
