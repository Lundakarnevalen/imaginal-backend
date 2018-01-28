const User = require('../../models/users').User
const fs = require('fs')
const parse = require('csv-parse');
const path = require('path')

// Get all users from database with their big and small pleasure preferens
let users = []
async function getDbUsers(){
  let db_users = await User.findAll( {} )

  for(let i = 0; i < db_users.length; i++){
    let usr = db_users[i];
    let big_category = await usr.getUserBigAudition()
    let small_category = await usr.getUserSmallAudition()
    users.push({
      name: `${usr.firstName} ${usr.lastName}`,
      email: usr.email,
      big_category, 
      small_category, 
    })
  }
}

// Get all data from csv file
let csv_users = []
function parseUserTimes(err, data){
  data.shift()
  csv_users = data.map(d => {
    return {
      created: d[0],
      name: d[1],
      email: d[2],
      big_pleasure: d[3],
      fri: d[4],
      sat: d[5],
      sun: d[6],
    }
  })
}

function mergeUsersLists(list1, list2){
  let user_map = {}
  list1.forEach(x => user_map[x.email] = x)
  list2.forEach(x => {
    let other = user_map[x.email]
    x.big_category = other.big_category
    x.small_category = other.small_category
  })
  return list2
}

async function getUsers(){
  // Get data from csv file
  let parser = parse({delimiter: ','}, parseUserTimes);
  fs.createReadStream(__dirname+'/data.csv').pipe(parser);

  // Get data from db
  await getDbUsers()
  
  // Merge lists
  users =  mergeUsersLists(users, csv_users)

  // Return result
  return users
}

module.exports = {
  getUsers
}
