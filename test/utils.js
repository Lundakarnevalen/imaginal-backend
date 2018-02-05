
const getUser = () => {
  return {
    'email': 'test@gmail.com',
    'password': 'password',
    'postNumber': '123',
    'phoneNumber': 'phoneNumber',
    'firstName': 'firstName',
    'lastName': 'lastName',
    'address': 'address',
    'city': 'karlsstad',
    'careOf': 'careOf',
    'language': 'language',
    'driversLicense': 'driversLicense',
    'foodPreference': 'foodPreference',
    'disability': 'disability',
    'corps': 'corps',
    'startOfStudies': 'startOfStudies',
    'pastInvolvement': 'pastInvolvement',
    'groupLeader': true,
    'interests': 'interests',
    'misc': 'misc',
    'shirtSize': 'm',
    'plenipotentiary': false,
    'personalNumber': '0123456789',
    'studentNation': 'lunds',
    'interest': ['Skriv', 'dina', 'interest'],
    'skills': ['att', 'supa'],
    'bigPleasures': ['oh', 'yes'],
    'smallPleasures': ['no', 'thanks', 'for', 'asking']
  }
}

const getAdmin = () => {
  return {
    'email': 'admin@lundakarnevalen.se',
    'token': 'admintoken',
    'password': 'password',
    'postNumber': '123',
    'phoneNumber': 'phoneNumber',
    'firstName': 'firstName',
    'lastName': 'lastName',
    'address': 'address',
    'city': 'karlsstad',
    'careOf': 'careOf',
    'language': 'language',
    'driversLicense': 'driversLicense',
    'foodPreference': 'foodPreference',
    'disability': 'disability',
    'corps': 'corps',
    'startOfStudies': 'startOfStudies',
    'pastInvolvement': 'pastInvolvement',
    'groupLeader': true,
    'interests': 'interests',
    'misc': 'misc',
    'shirtSize': 'm',
    'plenipotentiary': false,
    'personalNumber': '0123456789',
    'studentNation': 'lunds',
    'interest': ['Skriv', 'dina', 'interest'],
    'skills': ['att', 'supa'],
    'bigPleasures': ['oh', 'yes'],
    'smallPleasures': ['no', 'thanks', 'for', 'asking']
  }
}

module.exports = {
  getAdmin,
  getUser
}