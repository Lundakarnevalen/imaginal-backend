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

    it('Unauthorized getOrderById, role: random user', done => {
      api.get('/api/warehouse/order/1')
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

    it('Unauthorized editOrder, role: random user', done => {
      api.post('/api/warehouse/order/edit')
        .set('Authorization', 'bearer ' + user.token)
        .send(orderTwo)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Unauthorized getOrdersOnUser, role: random user', done => {
      api.get('/api/warehouse/order/list/user')
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

    it('Unauthorized removeOrder, role: random user', done => {
      api.delete('/api/warehouse/order/remove/1')
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

    it('Unauthorized getAllOrders, role: random user', done => {
      api.get('/api/warehouse/order/list')
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

    it('Unauthorized checkoutOrderLines order, role: random user', done => {
      api.post('/api/warehouse/order/checkout/')
        .set('Authorization', 'bearer ' + user.token)
        .send({
          deliveryDate: '2018-05-30 00:00:01',
          storageLocationId: 1,
          orderLines: [{
            id: 2,
            orderId: 2,
            quantity: 5
          }, {
            id: 1,
            orderId: 1,
            quantity: 5
          }]
        })
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Unauthorized getOrdersOnSection, role: random user', done => {
      api.get('/api/warehouse/order/location/list/1')
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

    it('Authorized createOrder, role: warehouseCustomer', done => {
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

    it('Authorized getOrderById, role: warehouseCustomer', done => {
      api.get('/api/warehouse/order/3')
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

    it('Unauthorized editOrder, role: warehouseCustomer', done => {
      api.post('/api/warehouse/order/edit')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
        .send(orderTwo)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Authorized getOrdersOnUser, role: warehouseCustomer', done => {
      api.get('/api/warehouse/order/list/user')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data[2].id).to.equal(3)
          await expect(res.body.data[2].orderDeliveryDate).to.equal('2018-04-12T22:00:00.000Z')
          done()
        })
    })

    it('Unauthorized removeOrder, role: warehouseCustomer', done => {
      api.delete('/api/warehouse/order/remove/3')
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

    it('Unauthorized getAllOrders, role: warehouseCustomer', done => {
      api.get('/api/warehouse/order/list')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
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

    it('Unauthorized checkoutOrderLines order, role: warehouseCustomer', done => {
      api.post('/api/warehouse/order/checkout/')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
        .send({
          deliveryDate: '2018-05-30 00:00:01',
          storageLocationId: 1,
          orderLines: [{
            id: 2,
            orderId: 2,
            quantity: 5
          }, {
            id: 1,
            orderId: 1,
            quantity: 5
          }]
        })
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Unauthorized getOrdersOnSection, role: warehouseCustomer', done => {
      api.get('/api/warehouse/order/location/list/1')
        .set('Authorization', 'bearer ' + warehouseCustomer.token)
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

    it('Authorized createOrder, role: warehouseWorker', done => {
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

    it('Authorized getAllOrders, role: warehouseWorker', done => {
      api.get('/api/warehouse/order/list')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data[3].id).to.equal(4)
          await expect(res.body.data[3].orderDeliveryDate).to.equal('2018-04-12T22:00:00.000Z')
          done()
        })
    })

    it('Unauthorized editOrder, role: warehouseWorker', done => {
      api.post('/api/warehouse/order/edit')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .send(orderTwo)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Authorized getOrderById, role: warehouseWorker', done => {
      api.get('/api/warehouse/order/4')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data.id).to.equal(4)
          await expect(res.body.data.orderDeliveryDate).to.equal('2018-04-12T22:00:00.000Z')
          done()
        })
    })

    it('Unauthorized removeOrder, role: warehouseWorker', done => {
      api.delete('/api/warehouse/order/remove/4')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(401)
          done()
        })
    })

    it('Unauthorized getOrdersOnUser, role: warehouseWorker', done => {
      api.get('/api/warehouse/order/list/user')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Authorized checkoutOrderLines order, role: warehouseWorker', done => {
      api.post('/api/warehouse/order/checkout/')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .send({
          deliveryDate: '2018-05-30 00:00:01',
          storageLocationId: 1,
          orderLines: [{
            id: 2,
            orderId: 2,
            quantity: 5
          }, {
            id: 1,
            orderId: 1,
            quantity: 5
          }]
        })
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Authorized getOrdersOnSection, role: warehouseWorker', done => {
      api.get('/api/warehouse/order/location/list/1')
        .set('Authorization', 'bearer ' + warehouseWorker.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data[0].orderLines[0].quantityDelivered).to.equal(15)
          done()
        })
    })

    it('Authorized createOrder, role: warehouseManager', done => {
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

    it('Authorized getAllOrders, role: warehouseManager', done => {
      api.get('/api/warehouse/order/list')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data.length).to.equal(5)
          await expect(res.body.data[0].id).to.equal(1)
          await expect(res.body.data[0].orderDeliveryDate).to.equal('2018-04-13T00:00:00.000Z')
          done()
        })
    })

    it('Authorized editOrder, role: warehouseManager', done => {
      api.post('/api/warehouse/order/edit')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .send(orderTwo)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Authorized getOrderById, role: warehouseManager', done => {
      api.get('/api/warehouse/order/5')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data.id).to.equal(5)
          await expect(res.body.data.orderDeliveryDate).to.equal('2018-04-12T22:00:00.000Z')
          done()
        })
    })

    it('Authorized removeOrder, role: warehouseManager', done => {
      api.delete('/api/warehouse/order/remove/5')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Authorized getOrdersOnUser, role: warehouseManager', done => {
      api.get('/api/warehouse/order/list/user')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(400)
          await expect(res.body.message).to.equal('No orders on that user')
          done()
        })
    })

    it('Unauthorized checkoutOrderLines order, role: warehouseManager', done => {
      api.post('/api/warehouse/order/checkout/')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .send({
          deliveryDate: '2018-05-30 00:00:01',
          storageLocationId: 1,
          orderLines: [{
            id: 2,
            orderId: 2,
            quantity: 5
          }, {
            id: 1,
            orderId: 1,
            quantity: 5
          }]
        })
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Unauthorized getOrdersOnSection, role: warehouseManager', done => {
      api.get('/api/warehouse/order/location/list/1')
        .set('Authorization', 'bearer ' + warehouseManager.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data[0].id).to.equal(1)
          await expect(res.body.data[0].orderLines[0].quantityDelivered).to.equal(20)
          done()
        })
    })

    it('Unauthorized createOrder, role: admin', done => {
      api.post('/api/warehouse/order/new')
        .set('Authorization', 'bearer ' + admin.token)
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

    it('Unauthorized getAllOrders, role: admin', done => {
      api.get('/api/warehouse/order/list')
        .set('Authorization', 'bearer ' + admin.token)
        .send(orderOne)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data.length).to.equal(5)
          await expect(res.body.data[0].id).to.equal(1)
          await expect(res.body.data[0].orderDeliveryDate).to.equal('2018-04-13T00:00:00.000Z')
          done()
        })
    })

    it('Unauthorized editOrder, role: admin', done => {
      api.post('/api/warehouse/order/edit')
        .set('Authorization', 'bearer ' + admin.token)
        .send(orderTwo)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Unauthorized getOrderById, role: admin', done => {
      api.get('/api/warehouse/order/6')
        .set('Authorization', 'bearer ' + admin.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data.id).to.equal(6)
          await expect(res.body.data.orderDeliveryDate).to.equal('2018-04-12T22:00:00.000Z')
          done()
        })
    })

    it('Unauthorized removeOrder, role: admin', done => {
      api.delete('/api/warehouse/order/remove/6')
        .set('Authorization', 'bearer ' + admin.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Unauthorized getOrdersOnUser, role: admin', done => {
      api.get('/api/warehouse/order/list/user')
        .set('Authorization', 'bearer ' + admin.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(400)
          await expect(res.body.message).to.equal('No orders on that user')
          done()
        })
    })

    it('Unauthorized checkoutOrderLines order, role: admin', done => {
      api.post('/api/warehouse/order/checkout/')
        .set('Authorization', 'bearer ' + admin.token)
        .send({
          deliveryDate: '2018-05-30 00:00:01',
          storageLocationId: 1,
          orderLines: [{
            id: 2,
            orderId: 2,
            quantity: 5
          }, {
            id: 1,
            orderId: 1,
            quantity: 5
          }]
        })
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('Unauthorized getOrdersOnSection, role: admin', done => {
      api.get('/api/warehouse/order/location/list/1')
        .set('Authorization', 'bearer ' + admin.token)
        .end(async (err, res) => {
          if (err) {
            console.error('Failed to run test, aborting')
            process.exit(1)
          }
          await expect(res.statusCode).to.equal(200)
          await expect(res.body.data[0].id).to.equal(1)
          await expect(res.body.data[0].orderLines[0].quantityDelivered).to.equal(25)
          done()
        })
    })
  })
