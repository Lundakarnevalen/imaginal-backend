const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin, warehouseCustomer, warehouseWorker, 
  WarehouseManager, tag) => describe('API /api/warehouse/tag tag tests', function () {
  it('Unauthorized addTag, role: None', done => {
    api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        name: 'OneTag'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
    })

  it('Unauthorized addTag, role: warehouse customer', done => {
    api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .send({
        name: 'OneTag'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })

  it('Unauthorized addTag, role: warehouse worker', done => {
    api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .send({
        name: 'OneTag'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })

  it('Authorized addTag, role: warehouse manager', done => {
    api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + WarehouseManager.token)
      .send({
        name: 'OneTag'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.tag.name).to.equal('OneTag')
        await done()
      })
  })

  it('Authorized addTag, role: administrator', done => {
    api.post('/api/warehouse/tag/new')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        name: 'OneTag'
      })
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.tag.name).to.equal('OneTag')
        await done()
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
        await done()
      })
  })
  
  it('Unauthorized deleteTag, role: None', done => {
    api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
    })

  it('Unauthorized deleteTag, role: warehouse customer', done => {
    api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })

  it('Unauthorized deleteTag, role: warehouse worker', done => {
    api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + warehouseWorker.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })

  it('Authorized deleteTag, role: warehouse manager', done => {
    api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + WarehouseManager.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })

  it('Authorized deleteTag, role: administrator', done => {
    api.delete('/api/warehouse/tag/delete')
      .set('Authorization', 'bearer ' + admin.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })

  it('Unauthorized getTag, role: iser', done => {
    api.get('/api/warehouse/tag/list')
      .set('Authorization', 'bearer ' + user.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(401)
        await done()
      })
  })

  it('Authorized getTag, role: administrator', done => {
    api.get('/api/warehouse/tag/list')
      .set('Authorization', 'bearer ' + warehouseCustomer.token)
      .end(async(err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body[0].tag.name).to.equal('öl') 
        await done()
      })
  })
})
