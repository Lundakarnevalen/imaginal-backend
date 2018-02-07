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
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGx1bmRha2FybmV2YWxlbi5zZSIsImlhdCI6MTUxNzg2MzM0MH0.sTXMU6V2elo9kxTe-W8bd9KAT0XfR8_qFlZdBD9emMM',
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

const getToken = (user) => {

}

module.exports = {
  getToken,
  getUser,
  getAdmin
}
