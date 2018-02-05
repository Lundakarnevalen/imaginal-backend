const supertest = require('supertest')
const api = supertest('http://localhost:3000')

module.exports = (user, admin) => describe('API /api/users', function () {
  it('Should return two users', done => {
    api.get('/api/users')
      .set('Authorization', 'bearer ' + admin.token)
      .expect(200, done)
  })
})
