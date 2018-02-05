// TODO: Run seed and this in npm test
// TODO: Drop test database.
// TODO: Seeda in en token på adminen och avänd.

const utils = require('./utils')
const register = require('./registerTest')
const login = require('./loginTest')
const getAllUsers = require('./getAllUsersTest')

const user = utils.getUser()
const admin = utils.getAdmin()

register(user)
login(user)
getAllUsers(user, admin)

user.token = utils.getToken(user)
