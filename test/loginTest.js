const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user) => describe('API /login/email', function () {
  it('should login the user', done => {
    api.post('/login/email')
      .send({email: user.email, password: user.password})
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        user.token = res.body.accessToken
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Wrong email at login', done => {
    api.post('/login/email')
      .send({email: 'wrongemail', password: user.password})
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })
  it('Wrong accessToken', done => {
    api.get('/api/hello')
      .set('Authorization', 'bearer wrongaccesstoken')
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })
  it('No email at login', done => {
    api.post('/login/email')
      .send({password: user.password})
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
  it('No password at login', done => {
    api.post('/login/email')
      .send({email: user.email})
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
