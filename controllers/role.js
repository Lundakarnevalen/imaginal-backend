const User = require('../models/users').User
const Role = require('../models/role').Role

const addRole = function (req, res) {
  let userid = req.body.userid
  let roleid = req.body.roleid

  User.findOne({
    where: {id: userid}
  }).then(user => {
    console.log('userid: ' + userid)
    console.log('roleid: ' + roleid)

    Role.findOne({
      where: {id: roleid}
    }).then(role => {
      role.setUsers([user])
      res.send()
    })
  })
}

module.exports = {
  addRole
}
