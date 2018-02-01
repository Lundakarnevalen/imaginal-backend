const userToJSON = async (user) => {
  try {
    const checkedIn = await user.isCheckedIn()
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
      checkedIn,
      ...user.toJSON(),
      ...karnevalInfo.dataValues,
      roles: [...roles],
      skills,
      interests,
      bigPleasures,
      smallPleasures
    }

    return userinfo
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  userToJSON
}
