const shuffle = require('shuffle-array')
const fs = require('fs')
const path = require('path')
const GetUsers = require('./users').getUsers

// Get all group configurations
const Groups = require('./groups.json')

// OBS:
// all time is converted to minutes_of_the_day. This is easier to check if
// a time_period intercept each other or not. 10am is equal to 600

// START AUDITION BY CALLING THE audition FUNCTION
// audition()

async function audition () {
  console.log(0, 'Get users')

  // Get all data of users
  const users = await GetUsers()

  console.log(1, 'Setup meetings')

  // Create meeting for each user/group pair
  let meetings = setupMeetings(users)
  // Example of a meeting
  // { group: 'bigDance',
  //   user: {
  //     name: 'Nille',
  //     email: 'c@shapeapp.se3',
  //     big_pleasure: 'Operan, Showen, Spexet',
  //     fri: '16-18, 18-20',
  //     sat: '18-20, 20-22',
  //     sun: '18-20, 20-22' }},

  // User busy is a map containing a users scheduled auditions. Will be saved
  // as: user_busy[fri_my.mail@hotmale.com] = [ [500-504], [508-512] ]
  let userBusy = {}
  const groupNames = [
    'bigDance',
    'smallDance',
    'bigScene',
    'bigOrchestra',
    'smallScene',
    'smallOrchestra'
  ]
  const dayNames = [
    'sun',
    'fri',
    'sat'
  ]
  // Nice edition is if schedule-function should consider the users prefered
  // hours, or ignore them.
  let niceEdition = true

  console.log(3, 'Starting to schedule with nice edition')

  // For each group and day given in arrays above, schedule meetings
  // First with nice_edition = true
  dayNames.forEach(day => {
    groupNames.forEach(g => {
      console.log(3.1, `Scheduling ${day}, with group ${g}`)
      schedule(meetings, Groups[g], day, userBusy, niceEdition)
    })
  })

  console.log(4, 'Starting to schedule with NO nice edition')

  // Schedule again, but now without nice_edition.
  niceEdition = false
  dayNames.forEach(day => {
    groupNames.forEach(g => {
      schedule(meetings, Groups[g], day, userBusy, niceEdition)
    })
  })

  console.log('Outputing schedules')

  // Write the jury schedule to a csv file
  outputJurySchedule(meetings)

  // Write the jury schedule to a csv file
  outputUserSchedule(meetings)

  console.log(userBusy)
  // console.log(meetings)
}

// Start scheduling
function schedule (meetingList, group, day, userBusy, niceEdition) {
  const timePeriods = parseHours(group[day])

  // Filter meetings if the group is correct
  let meetings = meetingList.filter(m => m.group === group.name)

  // Randomization for varying the result.
  shuffle(meetings)

  // Loop through each time_period that is given for this group and day.
  timePeriods.forEach(period => {
    let [start, end] = period
    let currTime = start

    // Dance-jury will meet several auditioners at the same time. Therefor we
    // count number of iterations.
    let count = 1
    while (currTime < end) {
      // Loop through meetings until a user is available in this time slot
      for (let i = 0; i < meetings.length; i++) {
        let m = meetings[i]
        if (!m.time && isAvailable(day, currTime, group.time, m, userBusy, niceEdition)) {
          m.time = currTime
          m.day = day
          if (!userBusy[day + '_' + m.user.email]) {
            userBusy[day + '_' + m.user.email] = []
          }
          userBusy[day + '_' + m.user.email].push([currTime, currTime + group.time])
          break
        }
      }

      // Parallell means how many students can audition at the same time for
      // this jury. So we increase only curr_time after parallell-number of iterations.
      if (count % group.parallell === 0) {
        // Add auditon-time to current time
        currTime += group.time
      }
      count++
    }
  })
}

// This function checks whether a user is available in the proposed
// time.
function isAvailable (day, time, meetingTime, meeting, userBusy, niceEdition) {
  const periods = parseHours(meeting.user[day].split(','))
  const [start, end] = [time, time + meetingTime]

  // If user already has other meeting. Check that they dont collide
  let busyTimes = userBusy[day + '_' + meeting.user.email]
  if (busyTimes) {
    let withinBusy = busyTimes.filter(x => {
      return x[0] <= start && start < x[1] || x[0] < end && end <= x[1] || x[0] > start && end >= x[1]
    }).length > 0
    return !withinBusy
  }

  // Check wether time proposal is within users selected times.
  // Only do this in niceEdition. On not niceEdition, give them the time anyway.
  if (niceEdition) {
    let withinUsersPeriod = periods.filter(x => {
      return x[0] <= start && start < x[1] || x[0] < end && end <= x[1] || x[0] > start && end >= x[1]
    }).length > 0
    if (!withinUsersPeriod) {
      return false
    }
  }
  // No collision detected. User is free for meeting
  return true
}

function setupMeetings (users) {
  let meetings = []

  for (let i = 0; i < users.length; i++) {
    let usr = users[i]

    // Convert small-array and big-array to one category array.

    let scat = usr.small_category
    let bcat = usr.big_category
    if (!scat) {
      scat = []
    }
    if (!bcat) {
      bcat = []
    }
    // console.log(i, usr )
    // console.log(usr, scat, bcat)
    let small = scat.map(s => 'small' + s.audition)
    let big = bcat.map(s => 'big' + s.audition)
    let categories = small.concat(big)

    categories.forEach(cat => {
      meetings.push({
        group: cat,
        user: {
          name: usr.name,
          email: usr.email,
          big_pleasure: usr.big_pleasure,
          fri: usr.fri,
          sat: usr.sat,
          sun: usr.sun
        }
      })
    })
  }
  return meetings
}

// Writes all meetings to a csv file.
function outputJurySchedule (meetings) {
  var file = fs.createWriteStream(path.join(__dirname, '/schedule_jury.csv'))
  file.on('error', function (err) { console.log('PANICPANICPANIC', err) })
  file.write('Jury,Namn,Epost,StoraNojen,Tid,Dag\n')
  meetings.forEach(m => {
    const output = [
      m.group,
      m.user.name,
      m.user.email,
      '"' + m.user.big_pleasure + '"',
      pad(parseInt(m.time / 60), 2) + ':' + pad(m.time % 60, 2),
      m.day
    ]
    file.write(output.join() + '\n')
  })
  file.end()
}

function outputUserSchedule (meetings) {
  var file = fs.createWriteStream(path.join(__dirname, '/schedule_user.csv'))
  file.on('error', function (err) { console.log('PANICPANICPANIC', err) })
  file.write('Namn,Epost,Tider\n')

  let days = {
    'fri': 'Fredag',
    'sat': 'Lördag',
    'sun': 'Söndag'
  }
  let groups = {
    'bigOrchestra': 'Orkest',
    'bigScene': 'Scen',
    'bigDance': 'Dans',
    'smallOrchestra': 'Orkest',
    'smallScene': 'Scen',
    'smallDance': 'Dans'
  }

  let users = meetings.reduce((acc, curr) => {
    // Format meeting string
    const group = groups[curr.group]
    const day = days[curr.day]
    const time = pad(parseInt(curr.time / 60), 2) + ':' + pad(curr.time % 60, 2)
    const meeting = `${group}- ${day} kl ${time}`

    // Add meeting to user
    if (acc[curr.user.email]) {
      acc[curr.user.email].meetings.push(meeting)
    } else {
      // Create user in acc
      acc[curr.user.email] = {
        name: curr.user.name,
        email: curr.user.email,
        meetings: [meeting]
      }
    }

    return acc
  }, {})

  Object.values(users).forEach(u => {
    const output = [
      u.name,
      u.email,
      '"' + u.meetings + '"'
    ]
    file.write(output.join() + '\n')
  })
  file.end()
}

function parseHours (list) {
  if (!list) {
    return []
  }

  let l = list.map(x =>
    x.split('-')
      .map(i => parseInt(i) * 60)
  )
  return l
}
function pad (n, width, z) {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

module.exports = {
  audition
}
