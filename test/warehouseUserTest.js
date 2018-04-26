const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, costBearer, warehouseUser) => describe('API /api/warehouse/user Warehouseuser tests', function () {
    it('Unauthorized getAllWarehouseUsers, role: random user', done => {
      api.get('/api/warehouse/user/list')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized getAllWarehouseUsers, role: warehouse customer', done => {
      api.get('/api/warehouse/user/list')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized getAllWarehouseUsers, role: warehouse worker', done => {
      api.get('/api/warehouse/user/list')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Authorized getAllWarehouseUsers, role: warehouse manager user', done => {
      api.get('/api/warehouse/user/list')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Authorized getAllWarehouseUsers, role: admin', done => {
      api.get('/api/warehouse/user/list')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Unauthorized getWarehouseUserById, role: random user', done => {
      api.get('/api/warehouse/user/')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized getWarehouseUserById, role: warehouse customer', done => {
      api.get('/api/warehouse/user/')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.id).to.equal(1)
        await expect(res.body.data.userId).to.equal(15000)
        done()
      })
    })

    it('Authorized getWarehouseUserById, role: warehouse worker', done => {
      api.get('/api/warehouse/user/')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.id).to.equal(2)
        await expect(res.body.data.userId).to.equal(15001)
        done()
      })
    })

    it('Authorized getWarehouseUserById, role: warehouse manager', done => {
      api.get('/api/warehouse/user/')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.id).to.equal(3)
        await expect(res.body.data.userId).to.equal(15002)
        done()
      })
    })

    it('Authorized getWarehouseUserById, role: admin', done => {
      api.get('/api/warehouse/user/')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.id).to.equal(4)
        await expect(res.body.data.userId).to.equal(1)
        done()
      })
    })

    it('Unauthorized getWarehouseUserByCostBearer, role: random user', done => {
      api.get('/api/warehouse/user/costbearer/1')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized getWarehouseUserByCostBearer, role: warehouse customer', done => {
      api.get('/api/warehouse/user/costbearer/1')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Authorized failed getWarehouseUserByCostBearer, role: warehouse worker', done => {
      api.get('/api/warehouse/user/costbearer/1')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Authorized failed getWarehouseUserByCostBearer, role: warehouse manager user', done => {
      api.get('/api/warehouse/user/costbearer/1')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Authorized failed getWarehouseUserByCostBearer, role: admin', done => {
      api.get('/api/warehouse/user/costbearer/1')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].userId).to.equal(15000)
        done()
      })
    })

    it('Unauthorized getWarehouseUserByCostBearer, role: random user', done => {
      api.get('/api/warehouse/user/costbearer/list')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized getWarehouseUserByCostBearer, role: warehouse customer', done => {
      api.get('/api/warehouse/user/costbearer/list')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].name).to.equal('Fabriken')
        done()
      })
    })

    it('Authorized failed getWarehouseUserByCostBearer, role: warehouse worker', done => {
      api.get('/api/warehouse/user/costbearer/list')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].name).to.equal('Fabriken')
        done()
      })
    })

    it('Authorized failed getWarehouseUserByCostBearer, role: warehouse manager user', done => {
      api.get('/api/warehouse/user/costbearer/list')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].name).to.equal('Fabriken')
        done()
      })
    })

    it('Authorized failed getWarehouseUserByCostBearer, role: admin', done => {
      api.get('/api/warehouse/user/costbearer/list')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].id).to.equal(1)
        await expect(res.body.data[0].name).to.equal('Fabriken')
        done()
      })
    })
  })
