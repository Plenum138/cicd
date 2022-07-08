// Importing express module
const express = require("express")
const rootRouter = express.Router()

//****START ROUTES****
// USER
const user_auth = require('./user/auth');


// ****ADMIN****
const admin_auth = require('./admin/auth');
const dashboard = require('./admin/admin')
const user_managment = require('./admin/user')
const setting = require('./admin/setting')
const page = require('./admin/page')
const role = require('./admin/role')
const stream = require('./admin/stream')
const classes = require('./admin/class')
const lunch_holl = require('./admin/lunch_holl')
const announcement = require('./admin/announcement')
const notification = require('./admin/notification')
const subject = require('./admin/subject')
const time_table = require('./admin/time_table')
const plan = require('./admin/plan')





//****END ROUTES****


 


//****Combine Routes****
// USER
rootRouter.use('/', user_auth);

// ADMIN
rootRouter.use('/', admin_auth);
rootRouter.use('/', dashboard);
rootRouter.use('/', user_managment);
rootRouter.use('/', setting);
rootRouter.use('/', page);
rootRouter.use('/', role);
rootRouter.use('/', stream);
rootRouter.use('/', classes);
rootRouter.use('/', lunch_holl);
rootRouter.use('/', announcement);
rootRouter.use('/', notification);
rootRouter.use('/', subject);
rootRouter.use('/', time_table);
rootRouter.use('/', plan);








//Export Routes
module.exports = rootRouter;