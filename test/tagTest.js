const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, tag) => describe('API /api/warehouse/tag tag tests', function () {
    it('Unauthorized addTag, role: warehouse customer', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send({
        name: 'hej'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized addTag, role: warehouse worker', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send({
        name: 'hej'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized addTag, role: warehouse manager', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send({
        name: 'hej'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Authorized addTag, role: administrator', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        name: 'hej'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Unauthorized addTag, wrong body', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        nam1e: 'OneTag'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        done()
      })
    })

    it('Unauthorized getTag, role: user', done => {
      api.get('/api/warehouse/tag/list')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized getTag, role: WarehouseCustomer', done => {
      api.get('/api/warehouse/tag/list')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('öl')
        done()
      })
    })

    it('Unauthorized deleteTag, role: None', done => {
      api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + user.token)
      .send({tag})
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized deleteTag, role: warehouse customer', done => {
      api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send({tag})
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized deleteTag, role: warehouse worker', done => {
      api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send({tag})
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized deleteTag, role: warehouse manager', done => {
      api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + admin.token)
      .send({tag})
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })
  })
