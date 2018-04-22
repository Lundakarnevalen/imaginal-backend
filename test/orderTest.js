const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, itemOne, itemTwo, orderOne, orderTwo, orderLineOne,
  orderLineTwo) => describe('API /api/warehouse/order/ order tests', function () {
    it('Unauthorized createOrder, role: random user', done => {
      api.post('/api/warehouse/order/new')
        .set('Authorization', 'bearer ' + user.token)
        .send(orderOne)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Authorized createOrder, role: warehouse customer', done => {
      api.post('/api/warehouse/order/new')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
        .send(orderOne)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Authorized createOrder, role: warehouse worker', done => {
      api.post('/api/warehouse/order/new')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .send(orderOne)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Authorized createOrder, role: warehouse manager', done => {
      api.post('/api/warehouse/order/new')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .send(orderOne)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })
  })
