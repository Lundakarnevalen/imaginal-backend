const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const expect = require('chai').expect

module.exports = (user, admin) => describe('API /api/user change user info', function () {
  it('Fail to set other users data when not admin', done => {
    api.put('/api/user/' + admin.email)
      .set('Authorization', 'bearer ' + user.token)
      .send({
        firstName: 'firstUserName',
        lastName: 'lastUserName',
        phoneNumber: 'userPhoneNumber',
        address: 'The user address',
        postNumber: 'His postal code',
        city: 'They built this city',
        careOf: 'careOf column',
        shirtSize: 'A big fucking shirt',
        language: 'Swedish',
        driversLicense: 'He can drive',
        foodPreference: 'He likes food',
        corps: 'He\'s in all corps',
        disability: 'Healthy as fuck!',
        startOfStudies: 'Early 1800-hundreds',
        pastInvolvement: 'He has done lots of stuff before',
        groupLeader: false,
        misc: 'There is nothing else to know about him',
        plenipotentiary: false,
        bff: 'helivesalone@theworld',
        studentNation: 'He made his own studentNation',
        skills: ['This', 'User', 'Can', 'Do', 'All'],
        interest: ['Reading', 'football'],
        bigPleasures: ['Drinking', 'Alcohol'],
        smallPleasures: ['School', 'Studying']
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
  it('Admin can set other users\' userinfo', done => {
    api.put('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + admin.token)
      .send({
        firstName: 'firstUserName2',
        lastName: 'lastUserName2',
        phoneNumber: 'userPhoneNumber2',
        address: 'The user address2',
        postNumber: 'His postal code2',
        city: 'They built this city2',
        careOf: 'careOf column2',
        shirtSize: 'A big fucking shirt2',
        language: 'Swedish2',
        driversLicense: 'He can drive2',
        foodPreference: 'He likes food2',
        corps: 'He\'s in all corps2',
        disability: 'Healthy as fuck!2',
        startOfStudies: 'Early 1800-hundreds2',
        pastInvolvement: 'He has done lots of stuff before2',
        groupLeader: true,
        misc: 'There is nothing else to know about him2',
        plenipotentiary: false,
        bff: 'helivesalone@theworld2',
        studentNation: 'He made his own studentNation2',
        skills: ['This', 'User', 'Can', 'Do', 'All'],
        interest: ['Reading', 'football'],
        bigPleasures: ['Drinking', 'Alcohol'],
        smallPleasures: ['School', 'Studying']
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
  it('Put new user data', done => {
    api.put('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + user.token)
      .send({
        firstName: 'firstUserName',
        lastName: 'lastUserName',
        phoneNumber: 'userPhoneNumber',
        address: 'The user address',
        postNumber: 'His postal code',
        city: 'They built this city',
        careOf: 'careOf column',
        shirtSize: 'A big fucking shirt',
        language: 'Swedish',
        driversLicense: 'He can drive',
        foodPreference: 'He likes food',
        corps: 'He\'s in all corps',
        disability: 'Healthy as fuck!',
        startOfStudies: 'Early 1800-hundreds',
        pastInvolvement: 'He has done lots of stuff before',
        groupLeader: false,
        misc: 'There is nothing else to know about him',
        plenipotentiary: false,
        bff: 'helivesalone@theworld',
        studentNation: 'He made his own studentNation',
        skills: ['This', 'User', 'Can', 'Do', 'All'],
        interest: ['Reading', 'football'],
        bigPleasures: ['Drinking', 'Alcohol'],
        smallPleasures: ['School', 'Studying']
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
  it('Validate all recently put data', done => {
    api.get('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.user.firstName).to.equal('firstUserName') // The first test from the body always fails...
        await expect(res.body.user.lastName).to.equal('lastUserName')
        await expect(res.body.user.phoneNumber).to.equal('userPhoneNumber')
        await expect(res.body.user.address).to.equal('The user address')
        await expect(res.body.user.postNumber).to.equal('His postal code')
        await expect(res.body.user.city).to.equal('They built this city')
        await expect(res.body.user.careOf).to.equal('careOf column')
        await expect(res.body.user.shirtSize).to.equal('A big fucking shirt')
        await expect(res.body.user.language).to.equal('Swedish')
        await expect(res.body.user.driversLicense).to.equal('He can drive')
        await expect(res.body.user.foodPreference).to.equal('He likes food')
        await expect(res.body.user.corps).to.equal('He\'s in all corps')
        await expect(res.body.user.disability).to.equal('Healthy as fuck!')
        await expect(res.body.user.startOfStudies).to.equal('Early 1800-hundreds')
        await expect(res.body.user.pastInvolvement).to.equal('He has done lots of stuff before')
        await expect(res.body.user.groupLeader).to.equal(false)
        await expect(res.body.user.misc).to.equal('There is nothing else to know about him')
        await expect(res.body.user.plenipotentiary).to.equal(false)
        await expect(res.body.user.bff).to.equal('helivesalone@theworld')
        await expect(res.body.user.studentNation).to.equal('He made his own studentNation')
        done()
      })
  })
  it('Put new user data again', done => {
    api.put('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + user.token)
      .send({
        firstName: 'firstUserName1',
        lastName: 'lastUserName1',
        phoneNumber: 'userPhoneNumber1',
        address: 'The user address1',
        postNumber: 'His postal code1',
        city: 'They built this city1',
        careOf: 'careOf column1',
        shirtSize: 'A big fucking shirt1',
        language: 'Swedish1',
        driversLicense: 'He can drive1',
        foodPreference: 'He likes food1',
        corps: 'He\'s in all corps1',
        disability: 'Healthy as fuck!1',
        startOfStudies: 'Early 1800-hundreds1',
        pastInvolvement: 'He has done lots of stuff before1',
        groupLeader: true,
        misc: 'There is nothing else to know about him1',
        plenipotentiary: true,
        bff: 'helivesalone@theworld1',
        studentNation: 'He made his own studentNation1',
        skills: ['This', 'is', 'Sparta'],
        interest: ['Ice-skating'],
        bigPleasures: ['Games'],
        smallPleasures: ['Going to bed']
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
  it('Validate all recently put data again', done => {
    api.get('/api/user/' + user.email)
      .set('Authorization', 'bearer ' + user.token)
      .end(async (err, res) => {
        if (err) {
          console.error('Failed to run test, aborting')
          process.exit(1)
        }
        await expect(res.statusCode).to.equal(200)
        await expect(res.body.user.firstName).to.equal('firstUserName1')
        await expect(res.body.user.lastName).to.equal('lastUserName1')
        await expect(res.body.user.phoneNumber).to.equal('userPhoneNumber1')
        await expect(res.body.user.address).to.equal('The user address1')
        await expect(res.body.user.postNumber).to.equal('His postal code1')
        await expect(res.body.user.city).to.equal('They built this city1')
        await expect(res.body.user.careOf).to.equal('careOf column1')
        await expect(res.body.user.shirtSize).to.equal('A big fucking shirt1')
        await expect(res.body.user.language).to.equal('Swedish1')
        await expect(res.body.user.driversLicense).to.equal('He can drive1')
        await expect(res.body.user.foodPreference).to.equal('He likes food1')
        await expect(res.body.user.corps).to.equal('He\'s in all corps1')
        await expect(res.body.user.disability).to.equal('Healthy as fuck!1')
        await expect(res.body.user.startOfStudies).to.equal('Early 1800-hundreds1')
        await expect(res.body.user.pastInvolvement).to.equal('He has done lots of stuff before1')
        await expect(res.body.user.groupLeader).to.equal(true)
        await expect(res.body.user.misc).to.equal('There is nothing else to know about him1')
        await expect(res.body.user.plenipotentiary).to.equal(true)
        await expect(res.body.user.bff).to.equal('helivesalone@theworld1')
        await expect(res.body.user.studentNation).to.equal('He made his own studentNation1')
        done()
      })
  })
})
