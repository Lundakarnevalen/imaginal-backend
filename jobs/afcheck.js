const users = require('../models/users')
const User = users.User
const KarnevalistInfo = users.KarnevalistInfo
const rp = require('request-promise');


async function afCheck(){

  try {
    // Get all users that arent members in af
    let nonmembers = await User.findAll({
      include: [{
        model: KarnevalistInfo,
        where: { afMember: false},
      }]
    })

    // Extract all personalNumbers from nonmembers
    //console.log('nonmembers', nonmembers)
    // SSN stands for social-security number
    let ssn = nonmembers.map(u => u.personalNumber)
    //console.log('ssn', ssn)

    // Send POST request to AF server
    const members = await rp({
        method: 'POST',
        uri: process.env.AF_URL || 'http://shapeapp.se/karne/test.php',
        body: ssn,
        json: true // Automatically stringifies the body to JSON
    }).json()


    // Get userObjects from the received personalNumbers
    let userObjects = await User.findAll({
      where: { personalNumber: members }
    })
    let userIDs = userObjects.map(user => user.id)
    //console.log('userIDs', userIDs)

    // Perform the update on all karnevalistInfo
    await KarnevalistInfo.update({
      afMember: true
    }, { 
      where: {
        UserId: userIDs
      }
    })
  
  } catch(err){
    console.log('AF-CHECK error: ', err)
  }
}

module.exports = {
  afCheck
}
