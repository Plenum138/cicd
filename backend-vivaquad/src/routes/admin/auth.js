// Importing express module
const express = require("express")
const router = express.Router()
const authCtrl = require('../../controllers/authController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')
const upload = require("../../middlewares/image_upload");

router.use(cors());
// ***ADMIN APIS****
router.post('/api/admin/login', authCtrl.adminLogin)
router.post('/api/admin/resetPassword', authCtrl.adminrecoverpassword);
router.post('/api/admin/forgetpassword', authCtrl.adminforgotpassword);
router.post('/api/verify/otp', authCtrl.adminverifyOtp);

// SUBADMIN SIGNUP
router.post('/api/subadmin/signup', upload.any(), authCtrl.subadminSignup)
router.post('/api/stripe-pay', authCtrl.stripeAmountPay)



module.exports = router;