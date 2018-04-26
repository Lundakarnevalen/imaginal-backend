const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin) => describe('API /jodel/newpost', function () {
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        message: 'New jodel post!'
      })
    .end(async (err, res) => {
      if (err) {
        console.error('Failed to run test, aborting')
        process.exit(1)
      }
      await expect(res.statusCode).to.equal(200)
      await done()
    })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        message: 'New jodel post!'
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(200)
         await done()
       })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        message: 'New jodel post!'
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(200)
         await done()
       })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        message: 'New jodel post!'
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(200)
         await done()
       })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
     .send({
       message: 'New jodel post!'
     })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(200)
         await done()
       })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        message: 'New jodel post!'
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(200)
         await done()
       })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post new post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Get the new posts, should be 12', done => {
    api.get('/api/jodel/all/11')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: 'New jodel post!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.posts.length).to.equal(2)
        await done()
      })
  })
})
