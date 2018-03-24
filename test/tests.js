// TODO: Run seed and this in npm test
// TODO: Drop test database.
// TODO: Seeda in en token på adminen och avänd.

const utils = require('./utils')
const register = require('./registerTest')
const login = require('./loginTest')
const getAllUsers = require('./getAllUsersTest')
const userChangeInfo = require('./userChangeInfoTest')
const role = require('./roleTest')
const userInfo = require('./userInfoTest')
const user = utils.getUser()
const admin = utils.getAdmin()
const checkin = require('./checkinTest')
const tresureHunt = require('../treasureHunt/test')

register(user)
login(user)
userInfo(user, admin)
role(user, admin)
getAllUsers(user, admin)
userChangeInfo(user, admin)
checkin(user, admin)
tresureHunt(user)
