const fs = require('fs')
const parse = require('csv-parse')
const path = require('path')
const User = require('../../models/users').User
const Checkin = require('../../models/checkin').Checkin

function includes (list, item) {
  return list.indexOf(item) > -1
}

// Get all users from database with their big and small pleasure preferens
let users = []
async function getDbUsers () {
  let dbUsers = await User.findAll({})

  let checkins = await Checkin.findAll({})
  checkins = checkins.map(c => c.userId)

  for (let i = 0; i < dbUsers.length; i++) {
    let usr = dbUsers[i]

    if (!includes(checkins, usr.id)) {
      // console.log('USERNOTCHECKEDIN: ', usr)
      continue
    }

    try {
      let bigCategory = await usr.getUserBigAudition()
      let smallCategory = await usr.getUserSmallAudition()
      users.push({
        name: `${usr.firstName} ${usr.lastName}`,
        email: usr.email,
        big_category: bigCategory,
        small_category: smallCategory
      })
    } catch (e) {
      console.log('ERRORERROR', e)
    }
  }
}

// Get all data from csv file
let csvUsers = []
function parseUserTimes (err, data) {
  if (err) return null
  data.shift()
  csvUsers = data.map(d => {
    return {
      created: d[0],
      name: d[1],
      email: d[2],
      big_pleasure: d[3],
      fri: d[4],
      sat: d[5],
      sun: d[6]
    }
  })
}

function mergeUsersLists (list1, list2) {
  let userMap = {}
  list1.forEach(x => {
    userMap[x.email.toLowerCase().trim()] = x
  })
  list2.forEach(x => {
    let other = userMap[x.email.toLowerCase().trim()]
    if (!other) {
      console.log(x.email, ' EMAILNOT exists')
      return
    }
    if (!other.big_category || !other.small_category) {
      console.log('ERROR', other.big_category, other.small_category)
    }
    x.big_category = other.big_category
    x.small_category = other.small_category
  })
  console.log(userMap)
  return list2
}

async function getUsers () {
  // Get data from csv file
  let parser = parse({delimiter: ','}, parseUserTimes)
  fs.createReadStream(path.join(__dirname, '/audition_data.csv')).pipe(parser)

  // Get data from db
  await getDbUsers()

  // Merge lists
  users = mergeUsersLists(users, csvUsers)

  // Return result
  return users
}

module.exports = {
  getUsers
}
