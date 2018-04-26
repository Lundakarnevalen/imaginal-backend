const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin) => describe('API /jodel/', function () {
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
  it('Post invalid post', done => {
    api.post('/api/jodel/newpost')
      .set('Authorization', 'bearer ' + user.token)
      .send({ message: '' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })

  it('Get the new posts, should be 2', done => {
    api.get('/api/jodel/all/11')
      .set('Authorization', 'bearer ' + user.token)
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
  it('Get the new posts, should be 12', done => {
    api.get('/api/jodel/all/1')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.posts.length).to.equal(12)
        await expect(res.body.posts[0].id).to.equal(2)
        await expect(res.body.posts[2].id).to.equal(4)
        await expect(res.body.posts[11].id).to.equal(13)
        await done()
      })
  })
  it('get post with id 3', done => {
    api.get('/api/jodel/3')
      .set('authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.post.id).to.equal(3)
        await expect(res.body.post.voted).to.equal(false)
        await done()
      })
  })
  it('get post with invalid id', done => {
    api.get('/api/jodel/14')
      .set('authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
  it('get post with invalid id', done => {
    api.get('/api/jodel/a')
      .set('authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
  it('Post comment', done => {
    api.post('/api/jodel/newcomment')
      .set('Authorization', 'bearer ' + user.token)
      .send({ jodelId: 4, message: 'New jodel comment!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post comment', done => {
    api.post('/api/jodel/newcomment')
      .set('Authorization', 'bearer ' + admin.token)
      .send({ jodelId: 4, message: 'New jodel comment again!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('Post comment', done => {
    api.post('/api/jodel/newcomment')
      .set('Authorization', 'bearer ' + user.token)
      .send({ jodelId: 5, message: 'Another jodel comment!' })
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await done()
      })
  })
  it('get post with id 4', done => {
    api.get('/api/jodel/4')
      .set('authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('failed to run test, aborting')
          process.exit(1)
        }
        console.log(res.body)
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.post.id).to.equal(4)
        await expect(res.body.comments.length).to.equal(2)
        await expect(res.body.comments[0].isOp).to.equal(true)
        await expect(res.body.comments[1].isOp).to.equal(false)
        await expect(res.body.post.comments).to.equal(2)
        await expect(res.body.post.voted).to.equal(false)
        await done()
      })
  })
  it('Get posts, should show how many comments', done => {
    api.get('/api/jodel/all/0')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.posts.length).to.equal(12)
        await expect(res.body.posts[3].comments).to.equal(2)
        await expect(res.body.posts[4].comments).to.equal(1)
        await done()
      })
  })
  it('Get posts, invalid offset', done => {
    api.get('/api/jodel/all/-5')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(400)
        await done()
      })
  })
  it('Vote on a post', done => {
    api.post('/api/jodel/vote')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 4, value: 1
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
  it('Vote on a post', done => {
    api.post('/api/jodel/vote')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 3, value: '-1'
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
  it('Vote on a post which has been voted on already', done => {
    api.post('/api/jodel/vote')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 4, value: 1
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(401)
         await done()
       })
  })
  it('Get the new posts, should be 12', done => {
    api.get('/api/jodel/all/1')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.posts.length).to.equal(12)
        await expect(res.body.posts[0].id).to.equal(2)
        await expect(res.body.posts[2].id).to.equal(4)
        await expect(res.body.posts[2].voted).to.equal(true)
        await expect(res.body.posts[11].voted).to.equal(false)
        await expect(res.body.posts[11].id).to.equal(13)
        await done()
      })
  })
  it('User adds a favourite', done => {
    api.post('/api/jodel/addfavourite')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 4
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
  it('User adds a favourite', done => {
    api.post('/api/jodel/addfavourite')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 3
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
  it('User adds same favourite again', done => {
    api.post('/api/jodel/addfavourite')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 4
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(400)
         await done()
       })
  })
  it('User adds invalid favourite', done => {
    api.post('/api/jodel/addfavourite')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 50
      })
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(400)
         await done()
       })
  })
  it('Get posts, should show favourite', done => {
    api.get('/api/jodel/all/0')
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        console.log(res.body.posts)
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.posts.length).to.equal(12)
        await expect(res.body.posts[3].isFavourite).to.equal(true)
        await expect(res.body.posts[2].votes).to.equal(-1)
        await expect(res.body.posts[3].votes).to.equal(1)
        await done()
      })
  })
  it('Report a post', done => {
    api.post('/api/jodel/report/post')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 4
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

  it('Report a post', done => {
    api.post('/api/jodel/report/post')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 3
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
  it('Reports the same post', done => {
    api.post('/api/jodel/report/post')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        jodelId: 3
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
  it('Report a comment', done => {
    api.post('/api/jodel/report/comment')
      .set('Authorization', 'bearer ' + user.token)
      .send({
        commentId: 2
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

  it('User get a list of reports', done => {
    api.get('/api/jodel/reports/0')
      .set('Authorization', 'bearer ' + user.token)
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(401)
         await done()
       })
  })
  it('Admin get a list of reports', done => {
    api.get('/api/jodel/reports/0')
      .set('Authorization', 'bearer ' + admin.token)
       .end(async (err, res) => {
         if (err) {
           console.error('Failed to run test, aborting')
           process.exit(1)
         }
         await expect(res.statusCode).to.equal(200)
         await expect(res.body.reports.length).to.equal(4)
         await done()
       })
  })
  it('Admin delete post', done => {
    api.post('/api/jodel/delete/post')
      .set('Authorization', 'bearer ' + admin.token)
       .send({
         jodelId: 4
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
  it('Admin delete comment', done => {
    api.post('/api/jodel/delete/comment')
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        commentId: 1
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
  it('User delete post', done => {
    api.post('/api/jodel/delete/post')
      .set('Authorization', 'bearer ' + user.token)
       .send({
         jodelId: 6
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
})
