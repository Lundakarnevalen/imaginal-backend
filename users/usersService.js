const Skills = require('../models/skills').Skills
const BigPleasures = require('../models/bigpleasures').BigPleasures
const SmallPleasures = require('../models/smallpleasures').SmallPleasures
const Interest = require('../models/interests').Interests

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

/** Sets the users interests, skills, bigpleasures and smallaudutions. */
const setUserSkillsAndTalents = async (user, interests, skills, bigAuditions, smallAuditions, t) => {
  const isValidArray = (input) => {
    return input && Array.isArray(input)
  }

  /** TODO: This is the same code as in register.js, we need to refactor stuff */

  if (isValidArray(interests)) {
    await user.getUserInterest({t}).map(async(interest) => { await interest.destroy({t}) })
    const userInterests = await Promise.all(interests.map(async (interest) => { return Interest.create({interest}, {t}) }))
    await user.setUserInterest(userInterests, {t})
  }

  if (isValidArray(skills)) {
    await user.getUserSkill({t}).map(async(skill) => { await skill.destroy({t}) })
    const userSkills = await Promise.all(skills.map(async (skill) => { return Skills.create({skill}, {t}) }))
    await user.setUserSkill(userSkills, {t})
  }

  if (isValidArray(bigAuditions)) {
    await user.getUserBigAudition({t}).map(async(audition) => { await audition.destroy({t}) })
    const bigPleasures = await Promise.all(bigAuditions.map(async (bigPleasures) => { return BigPleasures.create({audition: bigPleasures}, {t}) }))
    await user.setUserBigAudition(bigPleasures)
  }

  if (isValidArray(smallAuditions)) {
    await user.getUserSmallAudition({t}).map(async(audition) => { await audition.destroy({t}) })
    const smallPleasures = await Promise.all(smallAuditions.map(async (smallPleasures) => { return SmallPleasures.create({audition: smallPleasures}, {t}) }))
    await user.setUserSmallAudition(smallPleasures, {t})
  }
  await user.save()
}

/** Sets and updates the users information */
const setAndUpdateUserInformation = async (user, dataFields, t) => {
  // All editable user fields
  const fields = [
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'postNumber',
    'city',
    'careOf',
    'shirtSize'
  ]

  // All editable karnevalistInfo fields
  const entryFields = [
    'language',
    'driversLicense',
    'foodPreference',
    'disability',
    'corps',
    'startOfStudies',
    'pastInvolvement',
    'groupLeader',
    'misc',
    'plenipotentiary',
    'bff',
    'studentNation'
  ]

  const entry = await user.getKarnevalistInfo()

  fields.forEach(key => {
    if (dataFields.hasOwnProperty(key)) {
      user[key] = dataFields[key]
    }
  })

  entryFields.forEach(key => {
    if (dataFields.hasOwnProperty(key)) {
      entry[key] = dataFields[key]
    }
  })

  await user.save({t})
  await entry.save({t})
}

module.exports = {
  userToJSON,
  isCheckedIn,
  setUserSkillsAndTalents,
  setAndUpdateUserInformation
}
