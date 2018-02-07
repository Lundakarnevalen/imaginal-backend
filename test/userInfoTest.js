const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin) => describe('API /api/user/ userinfo test', function () {
  it('Get own karnevalist info', done => {
    api.get('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body).to.contain.keys(['userinfo'])
        await expect(res.body.userinfo.id).to.equal(3)
        done()
      })
  })
  it('Fail to get other karnevalistinfo when not admin', done => {
    api.get('/api/user/' + admin.email)
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })
  it('Admin can get other userinfo', done => {
    api.get('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body).to.contain.keys(['userinfo'])
        await expect(res.body.userinfo.id).to.equal(3)
        await done()
      })
  })
  it('Admin can get 400 when getting non-existant user', done => {
    api.get('/api/user/nonExistantUser')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
})
