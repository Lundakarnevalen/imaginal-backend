const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, item) => describe('API /api/warehouse/product/new item tests', function () {
    it('Unauthorized addItem, role: random user', done => {
      api.post('/api/warehouse/product/new')
      .set('Authorization', 'bearer ' + user.token)
      .send({ item })
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
      .send({ item })
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
      .send({ item })
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
      .send({ item })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        // LÄGGA TILL DE ANDRA CHECKSEN HÄR ATT RÄTT SAKER KOMMER MED
        done()
      })
    })

    it('Unauthorized editItem, role: random user', done => {
      api.post('/api/warehouse/product/edit')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        'name': 'cider2',
        'imageUrl': 'hej.se',
        'unit': 'burk',
        'purchasePrice': 20,
        'salesPrice': 30,
        'description': 'det är en cider',
        'articleNumber': '1723255',
        'supplier': 'FINN',
        'note': 'Detta är ju kalas',
        'warningAmount': '100',
        'vat': 15
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

    it('Unauthorized editItem, role: warehouse customer', done => {
      api.post('/api/warehouse/product/edit')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send({
        'name': 'cider2',
        'imageUrl': 'hej.se',
        'unit': 'burk',
        'purchasePrice': 20,
        'salesPrice': 30,
        'description': 'det är en cider',
        'articleNumber': '1723255',
        'supplier': 'FINN',
        'note': 'Detta är ju kalas',
        'warningAmount': '100',
        'vat': 15
      }).end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized editItem, role: warehouse worker', done => {
      api.post('/api/warehouse/product/edit')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send({
        'name': 'cider2',
        'imageUrl': 'hej.se',
        'unit': 'burk',
        'purchasePrice': 20,
        'salesPrice': 30,
        'description': 'det är en cider',
        'articleNumber': '1723255',
        'supplier': 'FINN',
        'note': 'Detta är ju kalas',
        'warningAmount': '100',
        'vat': 15
      }).end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Authorized editItem, role: warehouse manager', done => {
      api.post('/api/warehouse/product/edit')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send({
        'name': 'cider2',
        'imageUrl': 'hej.se',
        'unit': 'burk',
        'purchasePrice': 20,
        'salesPrice': 30,
        'description': 'det är en cider',
        'articleNumber': '1723255',
        'supplier': 'FINN',
        'note': 'Detta är ju kalas',
        'warningAmount': '100',
        'vat': 15
      }).end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.name).to.equal('cider2')
        done()
      })
    })

    it('Authorized editItem, role: admin', done => {
      api.post('/api/warehouse/product/edit')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        'name': 'cider',
        'imageUrl': 'hej.se',
        'unit': 'burk',
        'purchasePrice': 20,
        'salesPrice': 30,
        'description': 'det är en cider',
        'articleNumber': '1723255',
        'supplier': 'FINN',
        'note': 'Detta är ju kalas',
        'warningAmount': '100',
        'vat': 15
      }).end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.name).to.equal('cider')
        done()
      })
    })

    it('Unauthorized getAllItems, role: user', done => {
      api.get('/api/warehouse/product/all')
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

    it('Authorized getAllItems, role: warehouse customer', done => {
      api.get('/api/warehouse/product/all')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item[0].name).to.equal('cider')
        await expect(res.body.item[0].imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getAllItems, role: warehouse worker', done => {
      api.get('/api/warehouse/product/all')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item[0].name).to.equal('cider')
        await expect(res.body.item[0].imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getAllItems, role: warehouse manager', done => {
      api.get('/api/warehouse/product/all')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item[0].name).to.equal('cider')
        await expect(res.body.item[0].imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getAllItems, role: admin', done => {
      api.get('/api/warehouse/product/all')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item[0].name).to.equal('cider')
        await expect(res.body.item[0].imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getItemById, role: user', done => {
      api.get('/api/warehouse/product/1')
      .set('Authorization', 'bearer ' + user.token)
      .send({ item })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)

        done()
      })
    })

    it('Authorized getItemById, role: warehouse customer', done => {
      api.get('/api/warehouse/product/1')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send({ item })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item.name).to.equal('cider')
        await expect(res.body.item.imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getItemById, role: warehouse worker', done => {
      api.get('/api/warehouse/product/1')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send({ item })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item.name).to.equal('cider')
        await expect(res.body.item.imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getItemById, role: warehouse manager', done => {
      api.get('/api/warehouse/product/1')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send({ item })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item.name).to.equal('cider')
        await expect(res.body.item.imageUrl).to.equal('hej.se')
        done()
      })
    })

    it('Authorized getItemById, role: admin', done => {
      api.get('/api/warehouse/product/1')
      .set('Authorization', 'bearer ' + admin.token)
      .send({ item })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.item.name).to.equal('cider')
        await expect(res.body.item.imageUrl).to.equal('hej.se')
        done()
      })
    })

    // SAKNAR getItemsOnTags
  })
