const User = require('../../models/users').User
const Checkin = require('../../models/checkin').Checkin
const fs = require('fs')
const parse = require('csv-parse');
const path = require('path')


function includes(list, item){
  return list.indexOf(item) > -1
}

// Get all users from database with their big and small pleasure preferens
let users = []
async function getDbUsers(){
  let db_users = await User.findAll( {} )

  let checkins = await Checkin.findAll( {} )
  checkins = checkins.map(c => c.userId)

  for(let i = 0; i < db_users.length; i++){
    let usr = db_users[i];

    if(!includes(checkins, usr.id)){
      //console.log('USERNOTCHECKEDIN: ', usr)
      continue
    }

    try{
    let big_category = await usr.getUserBigAudition()
    let small_category = await usr.getUserSmallAudition()
    users.push({
      name: `${usr.firstName} ${usr.lastName}`,
      email: usr.email,
      big_category: big_category, 
      small_category: small_category, 
    })
    } catch(e){
      console.log('ERRORERROR',e)
    }
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
  list1.forEach(x => {
    user_map[x.email.toLowerCase().trim()] = x
  })
  list2.forEach(x => {
    let other = user_map[x.email.toLowerCase().trim()]
    if(!other){
      console.log(x.email, ' EMAILNOT exists')
      return
    }
    if(!other.big_category || !other.small_category){
      console.log('ERROR', other.big_category, other.small_category)
    }
    x.big_category = other.big_category
    x.small_category = other.small_category
  })
  console.log(user_map)
  return list2
}

async function getUsers(){
  // Get data from csv file
  let parser = parse({delimiter: ','}, parseUserTimes);
  fs.createReadStream(__dirname+'/audition_data.csv').pipe(parser);

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
