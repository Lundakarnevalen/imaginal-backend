const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, itemOne, itemTwo, orderOne, orderTwo, orderLineOne,
  orderLineTwo) => describe('API /api/warehouse/product/new item tests', function () {
    it('Unauthorized addItem, role: random user', done => {
      api.post('/api/warehouse/product/new')
      .set('Authorization', 'bearer ' + user.token)
      .send(itemOne)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized addItem, role: warehouse customer', done => {
      api.post('/api/warehouse/product/new')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send(itemOne)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized addItem, role: warehouse worker', done => {
      api.post('/api/warehouse/product/new')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send(itemOne)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized addItem, role: warehouse manager', done => {
      api.post('/api/warehouse/product/new')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send(itemOne)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Authorized addItem, role: warehouse manager', done => {
      api.post('/api/warehouse/product/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send(itemTwo)
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
