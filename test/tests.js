// TODO: Run seed and this in npm test
// TODO: Drop test database.
// TODO: Seeda in en token på adminen och avänd.

const utils = require('./utils')
const register = require('./registerTest')
const login = require('./loginTest')

const user = utils.getUser()

register(user)
login(user)

user.token = utils.getToken(user)
