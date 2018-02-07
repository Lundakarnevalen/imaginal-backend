const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

// app.get('/api/user/checkin/:email', checkin.checkStatus)
// app.post('/api/user/checkin/:identification', checkin.checkIn)
// app.get('/api/user/listcheckins/:email', checkin.listCheckins)

module.exports = (user, admin) => describe('API /api/user/checkin Checkin user', function () {
  it('Admin can checkin other user', done => {
    api.post('/api/user/checkin/' + user.email)
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

  it('Admin can checkin self', done => {
    api.post('/api/user/checkin/' + admin.email)
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

  it('Admin fail to checkin invalid user', done => {
    api.post('/api/user/checkin/invaliduser')
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

  it('Admin fail to checkin checked in user', done => {
    api.post('/api/user/checkin/' + user.email)
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

  it('Users cannot checkin users', done => {
    api.post('/api/user/checkin/' + admin.email)
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

  it('Users can check their checkin status', done => {
    api.get('/api/user/checkin/' + user.email)
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.checkInInfo.checkerId).to.equal(1)
        await expect(res.body.checkInInfo.userId).to.equal(3)
        await done()
      })
  })

  it('Admin can check others checkin status', done => {
    api.get('/api/user/checkin/' + user.email)
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.checkInInfo.checkerId).to.equal(1)
        await expect(res.body.checkInInfo.userId).to.equal(3)
        await done()
      })
  })

  it('Users cannot check others checkin status', done => {
    api.get('/api/user/checkin/' + admin.email)
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

  it('Admin fail to check invalid users status', done => {
    api.get('/api/user/checkin/invaliduser')
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

  it('Admin can list all checkings made by user', done => {
    api.get('/api/user/listcheckins/' + admin.email)
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body).to.contain.keys(['checkIns'])
        const checkIns = res.body.checkIns
        await expect(checkIns[0].userId).to.equal(3)
        await expect(checkIns[1].userId).to.equal(1)
        await expect(res.body.checkIns.length).to.equal(2)
        await done()
      })
  })

  it('Admin cannot list all checkings made by invalid user', done => {
    api.get('/api/user/listcheckins/invaliduser')
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

  it('User cannot list all checkings made by user', done => {
    api.get('/api/user/listcheckins/' + admin.email)
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
