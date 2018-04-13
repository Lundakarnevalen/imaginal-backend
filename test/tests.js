// TODO: Run seed and this in npm test
// TODO: Drop test database.
// TODO: Seeda in en token på adminen och använd.

const utils = require('./utils')
const register = require('./registerTest')
const login = require('./loginTest')
const getAllUsers = require('./getAllUsersTest')
const userChangeInfo = require('./userChangeInfoTest')
const role = require('./roleTest')
const userInfo = require('./userInfoTest')
const checkin = require('./checkinTest')
const tagTest = require('./tagTest')
const itemTest = require('./itemTest')
const orderTest = require('./orderTest')
const warehouseUserTest = require('./warehouseUserTest')

const user = utils.getUser()
const admin = utils.getAdmin()
const warehouseCustomer = utils.getWarehouseCustomer()
const warehouseWorker = utils.getWarehouseWorker()
const warehouseManager = utils.getWarehouseManager()
const itemOne = utils.getItemOne()
const itemTwo = utils.getItemTwo()
const tagOne = utils.getTagOne()
const tagTwo = utils.getTagTwo()
const orderOne = utils.getOrderOne()
const orderTwo = utils.getOrderTwo()
const orderLineOne = utils.getOrderLineOne()
const orderLineTwo = utils.getOrderTwoOne()
const costBearer = utils.getCostBearer()
const warehouseUser = utils.getWarehouseUser()

register(user)
login(user)
userInfo(user, admin)
role(user, admin)
getAllUsers(user, admin)
userChangeInfo(user, admin)
checkin(user, admin)
tagTest(user, admin, warehouseCustomer, warehouseWorker, warehouseManager, tagOne, tagTwo)
itemTest(user, admin, warehouseCustomer, warehouseWorker, warehouseManager, itemOne, itemTwo, tagOne)
orderTest(user, admin, warehouseCustomer, warehouseWorker, warehouseManager,
  itemOne, itemTwo, orderOne, orderTwo, orderLineOne, orderLineTwo)
warehouseUserTest(user, admin, warehouseCustomer, warehouseWorker, warehouseManager, costBearer, warehouseUser)
