const supertest = require('supertest')
const api = supertest('http://localhost:3000')

module.exports = (user) => describe('API /login/email', function () {
  it('should login the user', done => {
    api.post('/login/email')
      .send({email: user.email, password: user.password})
      .expect(200, done)
  })
})
