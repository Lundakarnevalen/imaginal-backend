const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin) => describe('API /api/role role tests', function () {
  it('Unauthorized addRole, done', done => {
    api.post('/api/role/admin@lundakarnevalen.se/2')
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
  it('Unauthorized addRole, done', done => {
    api.delete('/api/role/admin@lundakarnevalen.se/2')
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
  it('addRole to user', done => {
    api.post('/api/role/' + user.email + '/2')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('addRole to admin', done => {
    api.post('/api/role/' + user.email + '/1')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Admin adds role', done => {
    api.post('/api/role/' + admin.email + '/2')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('User adds role', done => {
    api.post('/api/role/' + admin.email + '/2')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('User can get all users', done => {
    api.get('/api/users')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.users[0].firstName).to.equal('saknas')
        await expect(res.body.users[0].lastName).to.equal('saknas')
        await done()
      })
  })
  it('User remove role', done => {
    api.delete('/api/role/' + user.email + '/1')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Unauthorized user get all users', done => {
    api.get('/api/users')
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
  it('Unauthorized user remove role', done => {
    api.delete('/api/role/' + admin.email + '/1')
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
  it('Get users with role admin', done => {
    api.get('/api/role/1')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body).to.contain.keys(['users'])
        await expect(res.body.users[0].email).to.equal('admin@lundakarnevalen.se')
        await done()
      })
  })
  it('Get users with invalid role admin', done => {
    api.get('/api/role/45')
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

  it('Add role to invalid user', done => {
    api.post('/api/role/invaliduser/2')
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

  it('Add invalid role to user', done => {
    api.post('/api/role/' + admin.email + '/45')
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

  it('Unauthorized get all users with roleid', done => {
    api.get('/api/role/1')
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
})
