const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin) => describe('API /api/users get all users', function () {
  it('Should return three users', done => {
    api.get('/api/users')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.users.length).to.equal(3)
        await done()
      })
  })
  it('Should fail when not admin', done => {
    api.get('/api/users')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })
  it('Should return two users, offset 1', done => {
    api.get('/api/users?offset=1')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.users.length).to.equal(2)
        await done()
      })
  })
  it('Should return three users, invalid offset', done => {
    api.get('/api/users?offset=a')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.users.length).to.equal(3)
        await done()
      })
  })
  it('Should return no users, invalid offset', done => {
    api.get('/api/users?offset=-5')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(500)
        await expect(res.body.success).to.equal(false)
        await done()
      })
  })
  it('Should return three users, invalid offset', done => {
    api.get('/api/users?offset=')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.success).to.equal(true)
        await done()
      })
  })
  it('Unauthorized for user', done => {
    api.get('/api/users?offset=-5')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })
})
