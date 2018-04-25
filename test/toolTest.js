const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

<<<<<<< Updated upstream
module.exports = (user, admin, warehouseCustomer, warehouseWorker, warehouseManager, toolOne, toolTwo) => describe('API /api/warehouse/tool tool tests', function () {
  it('Unauthorized addTool, role: random user', done => {
    api.post('/api/warehouse/tool/new')
=======
module.exports = (user, admin, warehouseCustomer, warehouseWorker,
                  warehouseManager, toolOne, toolTwo) => describe('API /api/warehouse/tool tool tests', function () {
                    it('Unauthorized addTool, role: random user', done => {
                      api.post('/api/warehouse/tool/new')
>>>>>>> Stashed changes
      .set('Authorization', 'bearer ' + user.token)
      .send(toolOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
                    })

                    it('Unauthorized addTool, role: warehouse customer', done => {
                      api
      .post('/api/warehouse/tool/new')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send(toolOne)
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

                    it('Unauthorized addTool, role: warehouse worker', done => {
                      api.post('/api/warehouse/tool/new')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send(toolOne)
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

                    it('Authorized addTool, role: warehouse manager', done => {
                      api.post('/api/warehouse/tool/new')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send(toolOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
                    })

                    it('Authorized addTool, role: administrator', done => {
                      api.post('/api/warehouse/tool/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send(toolTwo)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        done()
      })
                    })

                    it('Unauthorized addTool, wrong body', done => {
                      api.post('/api/warehouse/tool/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        nam1e: 'OneTool'
      })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await expect(res.body.message).to.equal('Invalid parameter')
        done()
      })
                    })

                    it('Unauthorized getTool, role: user', done => {
                      api.get('/api/warehouse/tool/list')
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

                    it('Authorized getTool, role: WarehouseCustomer', done => {
                      api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('ÖrnisHammare')
        done()
      })
                    })

                    it('Authorized getTool, role: WarehouseCustomer', done => {
                      api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('ÖrnisHammare')
        done()
      })
                    })

                    it('Authorized getTool, role: WarehouseCustomer', done => {
                      api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('ÖrnisHammare')
        done()
      })
                    })

                    it('Authorized getTool, role: WarehouseCustomer', done => {
                      api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('ÖrnisHammare')
        done()
      })
                    })

                    it('Unauthorized deleteTool, role: None', done => {
                      api.delete('/api/warehouse/tool/delete/2')
      .set('Authorization', 'bearer ' + user.token)
      .send({id: 2})
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        done()
      })
                    })

                    it('Unauthorized deleteTool, role: warehouse customer', done => {
                      api.delete('/api/warehouse/tool/delete/2')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
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

                    it('Unauthorized deleteTool, role: warehouse worker', done => {
                      api.delete('/api/warehouse/tool/delete/2')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
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

<<<<<<< Updated upstream
  it('Authorized deleteTool, role: warehouse manager', done => {
    api.delete('/api/warehouse/tool/delete/1')
=======
                    it('Authorized deleteTool, role: warehouse manager', done => {
                      api.delete('/api/warehouse/tool/delete/2')
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  it('Authorized deleteTool, role: admin', done => {
    api.delete('/api/warehouse/tool/delete/2')
=======
                    it('Authorized deleteTool, role: admin', done => {
                      api.delete('/api/warehouse/tool/delete/3')
>>>>>>> Stashed changes
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
                  })
