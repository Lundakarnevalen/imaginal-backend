const User = require('../../models/users').User
const shuffle = require('shuffle-array');
const fs = require('fs')
const parse = require('csv-parse');
const GetUsers = require('./users').getUsers
const path = require('path')

// Get all group configurations
const Groups = require('./groups.json')

// OBS:
// all time is converted to minutes_of_the_day. This is easier to check if
// a time_period intercept each other or not. 10am is equal to 600

// START AUDITION BY CALLING THE audition FUNCTION
//audition()

async function audition(){
  // Get all data of users
  users = await GetUsers()

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
  let user_busy = {};
  const group_names = [
    'bigDance',
    'bigScene',
    'bigOrchest',
    'smallDance',
    'smallScene',
    'smallOrchest',
  ]
  const day_names = [
    'sun',
    'fri',
    'sat',
  ]
  // Nice edition is if schedule-function should consider the users prefered
  // hours, or ignore them.
  let nice_edition = true

  // For each group and day given in arrays above, schedule meetings
  // First with nice_edition = true
  day_names.forEach(day => {
    group_names.forEach(g => {
      schedule(meetings, Groups[g], day, user_busy, nice_edition)
    })
  })

  // Schedule again, but now without nice_edition.
  nice_edition = false
  day_names.forEach(day => {
    group_names.forEach(g => {
      schedule(meetings, Groups[g], day, user_busy, nice_edition)
    })
  })


  // Write the jury schedule to a csv file 
  outputJurySchedule(meetings)

  // Write the jury schedule to a csv file 
  outputUserSchedule(meetings)


  console.log(user_busy)
  //console.log(meetings)

}

// Start scheduling
function schedule(meetingList, group, day, user_busy, nice_edition){
  time_periods = parseHours(group[day]);


  // Filter meetings if the group is correct
  let meetings = meetingList.filter(m => m.group === group.name)

  // Randomization for varying the result.
  shuffle(meetings)

  // Loop through each time_period that is given for this group and day.
  time_periods.forEach(period => {
    let [start, end] = period
    let curr_time = start

    // Dance-jury will meet several auditioners at the same time. Therefor we
    // count number of iterations.
    let count = 1;
    while(curr_time < end ){

      // Loop through meetings until a user is available in this time slot
      for(let i = 0; i < meetings.length; i++){
        let m = meetings[i]
        if(!m.time && is_available(day, curr_time, group.time, m, user_busy, nice_edition)){
          m.time = curr_time
          m.day = day
          if(!user_busy[day + '_' + m.user.email]) {
            user_busy[day + '_' + m.user.email] = []
          }
          user_busy[day + '_' + m.user.email].push([curr_time, curr_time + group.time])
          break
        }
      }

      // Parallell means how many students can audition at the same time for
      // this jury. So we increase only curr_time after parallell-number of iterations.
      if(count % group.parallell == 0){
        // Add auditon-time to current time
        curr_time += group.time
      }
      count++
    }
  })
}

// This function checks whether a user is available in the proposed
// time.
function is_available(day, time, meeting_time, meeting, user_busy, nice_edition){
  periods = parseHours(meeting.user[day].split(','))
  const [start, end] = [time, time + meeting_time]

  // If user already has other meeting. Check that they dont collide
  let busy_times = user_busy[day + '_' + meeting.user.email]
  if(busy_times){
    let withinBusy = busy_times.filter(x => {
      return x[0] <= start && start < x[1] || x[0] < end && end <= x[1] || x[0] > start && end >= x[1];
    }).length > 0;
    return !withinBusy
  }

  // Check wether time proposal is within users selected times.
  // Only do this in nice_edition. On not nice_edition, give them the time anyway.
  if(nice_edition){
    let withinUsersPeriod = periods.filter(x => {
      return x[0] <= start && start < x[1] || x[0] < end && end <= x[1] || x[0] > start && end >= x[1];
    }).length > 0;
    if(!withinUsersPeriod){
      return false;
    }
  }
  // No collision detected. User is free for meeting
  return true;
}

function setupMeetings(users){
  let meetings = []
  for(let i = 0; i < users.length; i++){
    let usr = users[i]
  
    // Convert small-array and big-array to one category array.
    let small = usr.small_category.map(s => "small" + s.audition)
    let big = usr.big_category.map(s => "big" + s.audition)
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
          sun: usr.sun,
        }
      })
    })
  }
  return meetings
}

// Writes all meetings to a csv file.
function outputJurySchedule(meetings){
  var file = fs.createWriteStream(__dirname+'/schedule_jury.csv');
  file.on('error', function(err) { console.log('PANICPANICPANIC', err) });
  file.write('Jury,Namn,Epost,StoraNojen,Tid,Dag\n')
  meetings.forEach(m => {
    const output = [
      m.group,
      m.user.name,
      m.user.email,
      "\"" + m.user.big_pleasure + "\"",
      pad(parseInt(m.time / 60), 2) + ":" + pad(m.time % 60, 2),
      m.day,
    ]
    file.write(output.join() + '\n')
  })
  file.end();
}

function outputUserSchedule(meetings){
  var file = fs.createWriteStream(__dirname+'/schedule_user.csv');
  file.on('error', function(err) { console.log('PANICPANICPANIC', err) });
  file.write('Namn,Epost,Tider\n')

  let days = {
    'fri': 'Fredag den 9 februari',
    'sat': 'Lördag den 10 februari',
    'sun': 'Söndag den 11 februari',
  }
  let groups = {
    'bigOrchest': 'Orkest för Stora nöjen',
    'bigScene': 'Scen för Stora nöjen',
    'bigDance': 'Dans för Stora nöjen',
    'smallOrchest': 'Orkest för Små nöjen',
    'smallScene': 'Scen för Små nöjen',
    'smallDance': 'Dans för Små nöjen',
  }


  let users = meetings.reduce((acc, curr) => {

    // Format meeting string
    const group = groups[curr.group]
    const day = days[curr.day]
    const time = pad(parseInt(curr.time / 60), 2) + ":" + pad(curr.time % 60, 2);
    const meeting = `${group}, ${day} kl ${time}`

    // Add meeting to user
    if(acc[curr.user.email]){
      acc[curr.user.email].meetings.push( meeting )
    } else {
      // Create user in acc
      acc[curr.user.email] = {
        name: curr.user.name,
        email: curr.user.email,
        meetings: [meeting],
      }
    }

    return acc
  }, {})

  Object.values(users).forEach(u => {
    const output = [
      u.name,
      u.email,
      "\"" + u.meetings + "\"",
    ]
    file.write(output.join() + '\n')
  })
  file.end();
}



function parseHours(list){
  let l = list.map(x => 
    x.split('-')
      .map(i => parseInt(i) * 60 )
  )
  return l 
}
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

