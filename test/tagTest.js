const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, tagOne, tagTwo) => describe('API /api/warehouse/tag tag tests', function () {
    it('Unauthorized addTag, role: random user', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + user.token)
      .send(tagOne)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized addTag, role: warehouse customer', done => {
      api
        .post('/api/warehouse/tag/new')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
        .send(tagOne)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          await expect(res.body.message).to.equal('Go away!')
          done()
        })
    })

    it('Unauthorized addTag, role: warehouse worker', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send(tagOne)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await expect(res.body.message).to.equal('Go away!')
        done()
      })
    })

    it('Authorized addTag, role: warehouse manager', done => {
      api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send(tagOne)
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
      .send(tagTwo)
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
        await expect(res.body.message).to.equal('Invalid parameter')
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
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
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

    it('Authorized getTag, role: WarehouseCustomer', done => {
      api.get('/api/warehouse/tag/list')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
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

    it('Authorized getTag, role: WarehouseCustomer', done => {
      api.get('/api/warehouse/tag/list')
      .set('Authorization', 'bearer ' + warehouseManager.token)
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
      api.delete('/api/warehouse/tag/delete/2')
      .set('Authorization', 'bearer ' + user.token)
      .send({ id: 2 })
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
      api.delete('/api/warehouse/tag/delete/2')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await expect(res.body.message).to.equal('Go away!')
        done()
      })
    })

    it('Unauthorized deleteTag, role: warehouse worker', done => {
      api.delete('/api/warehouse/tag/delete/2')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await expect(res.body.message).to.equal('Go away!')
        done()
      })
    })

    it('Authorized deleteTag, role: warehouse manager', done => {
      api.delete('/api/warehouse/tag/delete/2')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Authorized deleteTag, role: warehouse manager', done => {
      api.delete('/api/warehouse/tag/delete/3')
      .set('Authorization', 'bearer ' + admin.token)
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
