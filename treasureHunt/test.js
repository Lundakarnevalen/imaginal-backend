const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user) => describe('API /api/treasurehunt/', function () {
  it('should start the hunt', done => {
    api.post('/api/treasurehunt/start')
      .send({email: user.email, password: user.password})
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        user.token = res.body.accessToken
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('should give info on current hunt', done => {
    api.get('/api/treasurehunt/info')
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.get('players')).to.not.equal(null)
        await done()
      })
  })
})
