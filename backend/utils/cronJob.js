const userModel = require('../models/UserSchema');
var CronJob = require('cron').CronJob;
const updateShift=async ()=>{
    await userModel.updateMany({},{shift:"0"});
}
var job = new CronJob(
    '0 0 1 * *',
    () => updateShift(),
    null,
    true,
    'Asia/Kolkata'
);
module.exports = { job,updateShift};