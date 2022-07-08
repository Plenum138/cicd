// Importing express module
const express = require("express")
const router = express.Router()
const timeTableController = require('../../controllers/timeTableController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // TIME TABLE API
  router.post("/api/create/time-table", authenticateJWT, timeTableController.createTimeTable)
  router.put("/api/update/time-table", authenticateJWT, timeTableController.updateTimeTable)
  router.delete("/api/delete/time-table", authenticateJWT, timeTableController.deleteTimeTable)
  router.post("/api/getAll/time-table-list", authenticateJWT, timeTableController.getAllTimeTableList)
  router.get('/api/get-time-table', timeTableController.getTimeTable);


  //User Time_Table API
  router.post("/api/user/time-table-list",authenticateJWT,  timeTableController.getUserTimeTable)
  router.post("/api/user/remove-time-table-schedule",authenticateJWT,  timeTableController.removeUserTimeTable)







module.exports = router; 