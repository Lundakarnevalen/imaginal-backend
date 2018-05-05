const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker,
  warehouseManager, storageLocationOne, storageLocationTwo) => describe('API /api/warehouse/location StorageLocation tests', function () {
    it('Unauthorized addStorageLocation, role: random user', done => {
      api.post('/api/warehouse/location/new')
      .set('Authorization', 'bearer ' + user.token)
      .send(storageLocationOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized addStorageLocation, role: warehouse customer', done => {
      api.post('/api/warehouse/location/new')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send(storageLocationOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
    })

    it('Unauthorized addStorageLocation, role: warehouse worker', done => {
      api.post('/api/warehouse/location/new')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send(storageLocationOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Authorized addStorageLocation, role: warehouse manager', done => {
      api.post('/api/warehouse/location/new')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send(storageLocationOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Authorized addStorageLocation, role: admin', done => {
      api.post('/api/warehouse/location/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send(storageLocationTwo)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('Unauthorized getStorageLocations, role: random user', done => {
      api.get('/api/warehouse/location/list')
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

    it('Unauthorized getStorageLocations, role: warehouse customer', done => {
      api.get('/api/warehouse/location/list')
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

    it('Authorized getStorageLocations, role: warehouse worker', done => {
      api.get('/api/warehouse/location/list')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }

        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].storageName).to.equal('Fabriken')
        done()
      })
    })

    it('Authorized getStorageLocations, role: warehouse manager', done => {
      api.get('/api/warehouse/location/list')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].storageName).to.equal('Fabriken')
        done()
      })
    })

    it('Authorized getStorageLocations, role: admin', done => {
      api.get('/api/warehouse/location/list')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].storageName).to.equal('Fabriken')
        done()
      })
    })

    it('Unauthorized getStorageLocationById, role: random user', done => {
      api.get('/api/warehouse/location/2')
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

    it('Unauthorized getStorageLocationById, role: warehouse customer', done => {
      api.get('/api/warehouse/location/2')
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

    it('Unauthorized getStorageLocationById, role: warehouse worker', done => {
      api.get('/api/warehouse/location/2')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.storageName).to.equal('Tåget')
        done()
      })
    })

    it('Authorized getStorageLocationById, role: warehouse manager', done => {
      api.get('/api/warehouse/location/2')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.storageName).to.equal('Tåget')
        done()
      })
    })

    it('Authorized getStorageLocationById, role: admin', done => {
      api.get('/api/warehouse/location/2')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data.storageName).to.equal('Tåget')
        done()
      })
    })

    it('Unauthorized getInventory, role: random user', done => {
      api.get('/api/warehouse/location/inventory/1')
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

    it('Unauthorized getInventory, role: warehouse customer', done => {
      api.get('/api/warehouse/location/inventory/1')
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

    it('Unauthorized getInventory, role: warehouse worker', done => {
      api.get('/api/warehouse/location/inventory/1')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].StorageLocations[0].storageName).to.equal('Fabriken')
        await expect(res.body.data[0].name).to.equal('karnevöl')
        await expect(res.body.data[0].StorageLocations[0].StorageContent.quantity).to.equal(170)
        done()
      })
    })

    it('Authorized getInventory, role: warehouse manager', done => {
      api.get('/api/warehouse/location/inventory/1')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].StorageLocations[0].storageName).to.equal('Fabriken')
        await expect(res.body.data[0].name).to.equal('karnevöl')
        await expect(res.body.data[0].StorageLocations[0].StorageContent.quantity).to.equal(170)
        done()
      })
    })

    it('Authorized getInventory, role: admin', done => {
      api.get('/api/warehouse/location/inventory/1')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('karnevöl')
        await expect(res.body.data[0].StorageLocations[0].storageName).to.equal('Fabriken')
        await expect(res.body.data[0].StorageLocations[0].StorageContent.quantity).to.equal(170)
        done()
      })
    })
  })
