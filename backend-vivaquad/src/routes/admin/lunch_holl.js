// Importing express module
const express = require("express")
const router = express.Router()
const lunchController = require('../../controllers/lunchController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // lunch API
  router.post("/api/create/lunch", authenticateJWT, lunchController.createLunch)
  router.post("/api/update/lunch", authenticateJWT, lunchController.updateLunch)
  router.post("/api/delete/lunch", authenticateJWT, lunchController.deleteLunch)
  router.post("/api/getAll/lunch-list", authenticateJWT, lunchController.getAllLunchList)
  router.post("/api/get/lunch-list",  lunchController.getLunchList)






module.exports = router; 