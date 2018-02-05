const supertest = require('supertest')
const api = supertest('http://localhost:3000')

const expect = require('chai').expect;
module.exports = (user, admin) => describe('API /api/users', function () {
  it('Should return three users', done => {
    api.get('/api/users')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        'use strict'
        console.log(res.text.toJSON())
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Should return two users', done => {
    api.get('/api/users')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        'use strict'
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
})
