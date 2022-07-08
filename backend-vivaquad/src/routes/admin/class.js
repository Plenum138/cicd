// Importing express module
const express = require("express")
const router = express.Router()
const classController = require('../../controllers/classController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // CLASS API
  router.post("/api/create/class", authenticateJWT, classController.createClass)
  router.post("/api/update/class", authenticateJWT, classController.updateClass)
  router.post("/api/delete/class", authenticateJWT, classController.deleteClass)
  router.post("/api/getAll/class-list", authenticateJWT, classController.getAllClassList)
  router.get("/api/get/class-list",  classController.getClassList)






module.exports = router; 