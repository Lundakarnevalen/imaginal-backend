const userToJSON = async (user) => {
  try {
    const checkedIn = await isCheckedIn(user)
    const allRoles = await user.getRoles()
    const roles = await allRoles.map(role => role.toJSON()).map(role => {
      return role
    })
    const usr = await user.dataValues
    delete usr.password
    delete usr.token
    delete usr.createdAt
    delete usr.updatedAt

    const karneInfo = await user.getKarnevalistInfo()
    const karnevalInfo = await karneInfo.toJSON()
    delete karnevalInfo.createdAt
    delete karnevalInfo.updatedAt
    delete karnevalInfo.UserId

    const skills = await user.getUserSkill().map(skill => skill.toJSON().skill)
    const interests = await user.getUserInterest().map(interest => interest.toJSON().interest)
    const bigPleasures = await user.getUserBigAudition().map(pleasure => pleasure.toJSON().audition)
    const smallPleasures = await user.getUserSmallAudition().map(pleasure => pleasure.toJSON().audition)

    const userinfo = {
      ...usr,
        ...karnevalInfo,
      roles: [...roles],
      skills,
      interests,
      bigPleasures,
      smallPleasures,
      checkedIn: checkedIn
    }
    return userinfo
  } catch (err) {
    console.error(err)
    return null
  }
}

const isCheckedIn = async (user) => {
  try {
    const checkIn = await user.getCheckin()
    return !!checkIn && checkIn.userId === user.id
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  userToJSON,
  isCheckedIn
}
