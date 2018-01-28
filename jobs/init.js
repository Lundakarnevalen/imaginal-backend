const schedule = require('node-schedule')
const afCheck = require('./afCheck').afCheck


// Cron scheduling format:
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)



function startJobs(){
  // This job can be canceled by afCheckJob.cancel()
  // AF-check will run at 02:37 every night.
  let afCheckJob = schedule.scheduleJob('37 2 * * *', afCheck);

}

module.exports = {
  startJobs
}
