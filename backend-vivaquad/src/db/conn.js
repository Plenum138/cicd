const mongoose = require('mongoose');

const localDB = "mongodb://127.0.0.1:27017/vivaquad";
const liveDB = "mongodb://plenum:raryFouPl1@161.97.157.111:27017/vivaquad?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";



mongoose.connect(process.env.MONGODB_URI || localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log(`DB connection successfull`);
}).catch((error) => {
    console.log(error);
});


mongoose.Promise = global.Promise;
module.exports = {
    UserLogins: require('../models/users'), 
    Setting: require('../models/settings'),
    Page: require('../models/pages'), 
    School: require('../models/schools'), 
    Role: require('../models/roles'),
    Stream: require('../models/streams'),
    Class: require('../models/classes'),
    Lunch: require('../models/lunch_holls'),
    Announcement: require('../models/announcements'),
    Notification: require('../models/notifications'),
    Meal_History: require('../models/meal_history'),
    Subject: require('../models/subjects'),
    Time_Table: require('../models/time_tables'),
    StripePayment: require('../models/stripe_payments'),
    Plan: require('../models/plans'),


};