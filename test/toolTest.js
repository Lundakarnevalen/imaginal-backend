const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker, warehouseManager, toolOne, toolTwo) => describe('API /api/warehouse/tool tool tests', function () {
  it('Unauthorized addTool, role: random user', done => {
    api.post('/api/warehouse/tool/new')
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

  it('Authorized addTool update quantity, role: warehouse manager', done => {
    api.post('/api/warehouse/tool/new')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send(toolOne)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.message).to.equal('Tool quantity has been added')
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
        name: 'OneTool'
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
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
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
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
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
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
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
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        done()
      })
  })

  it('Unauthorized getAllTools, role: user', done => {
    api.get('/api/warehouse/tool/list')
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

  it('Authorized getAllTools, role: warehouse customer', done => {
    api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        done()
      })
  })

  it('Authorized getAllTools, role: warehouse worker', done => {
    api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        done()
      })
  })

  it('Authorized getAllTools, role: warehouse manager', done => {
    api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        done()
      })
  })

  it('Authorized getAllTools, role: admin', done => {
    api.get('/api/warehouse/tool/list')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        done()
      })
  })

  it('Unauthorized getToolsOnTags, role: user', done => {
    api.post('/api/warehouse/tool/toolsontags')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        'tags': [{
          'id': 1,
          'name': 'verktyg'
        }]
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

  it('Authorized getToolsOnTags, role: warehouse customer', done => {
    api.post('/api/warehouse/tool/toolsontags')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send({
        'tags': [{
          'id': 2,
          'name': 'verktyg'
        }]
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('Hammare')
        await expect(res.body.data[0].imgUrl).to.equal('stor.se')
        done()
      })
  })

  it('Authorized getToolsOnTags, role: warehouse worker', done => {
    api.post('/api/warehouse/tool/toolsontags')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send({
        'tags': [{
          'id': 2,
          'name': 'verktyg'
        }]
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('Hammare')
        await expect(res.body.data[0].imgUrl).to.equal('stor.se')
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        await expect(res.body.data[2].name).to.equal('ArcombesHammare')
        await expect(res.body.data[2].imgUrl).to.equal('liten.se')
        done()
      })
  })

  it('Authorized getToolsOnTags, role: warehouse manager', done => {
    api.post('/api/warehouse/tool/toolsontags')
      .set('Authorization', 'bearer ' + warehouseManager.token)
      .send({
        'tags': [{
          'id': 2,
          'name': 'verktyg'
        }]
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('Hammare')
        await expect(res.body.data[0].imgUrl).to.equal('stor.se')
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        await expect(res.body.data[2].name).to.equal('ArcombesHammare')
        await expect(res.body.data[2].imgUrl).to.equal('liten.se')
        done()
      })
  })

  it('Authorized getToolsOnTags, role: admin', done => {
    api.post('/api/warehouse/tool/toolsontags')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        'tags': [{
          'id': 2,
          'name': 'verktyg'
        }]
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.data[0].name).to.equal('Hammare')
        await expect(res.body.data[0].imgUrl).to.equal('stor.se')
        await expect(res.body.data[1].name).to.equal('ÖrnisHammare')
        await expect(res.body.data[1].imgUrl).to.equal('stor.se')
        await expect(res.body.data[2].name).to.equal('ArcombesHammare')
        await expect(res.body.data[2].imgUrl).to.equal('liten.se')
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

  it('Authorized deleteTool, role: warehouse manager', done => {
    api.delete('/api/warehouse/tool/delete/1')
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

  it('Authorized deleteTool, role: admin', done => {
    api.delete('/api/warehouse/tool/delete/2')
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
