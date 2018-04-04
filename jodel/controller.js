const JodelPost = require('./jodelPost').Posts
JodelPost.sync()
const JodelComments = require('./jodelComments').Comments
JodelComments.sync()
const User = require('../users/users').User

const MAX_LENGTH = 200
const MIN_LENGTH = 1

const newPost = async (req, res) => {
  const message = req.body.message
  if (message.length > MAX_LENGTH || message.length < MIN_LENGTH) {
    return res.status(400).json({ success: false,
      message: 'Message too long or too short'
    })
  }

  
  const user = await User.findOne({
    where: {id: 1}
  })
  const newjp = await JodelPost.create({
    text: message
  })
  await user.addJodels([newjp])
  console.log('Jodel!') 
  console.log(user.firstName) 
  let jodel = await JodelPost.findOne({where: {id: 1}}) 
  await console.log('-----------Hämtar ut user---------')
  jodel = await jodel.getJodelUser()
  console.log(jodel.firstName)
  res.json({ success: true,
    message: 'Jodel posted',
    jId: newjp.id
  })
}

module.exports = {
  newPost
}
