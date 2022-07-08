// Importing express module
const express = require("express")
const router = express.Router()
const subjectController = require('../../controllers/subjectController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // SUBJECT API
  router.post("/api/create/subject", authenticateJWT, subjectController.createSubject)
  router.post("/api/update/subject", authenticateJWT, subjectController.updateSubject)
  router.post("/api/delete/subject", authenticateJWT, subjectController.deleteSubject)
  router.post("/api/getAll/subject-list", authenticateJWT, subjectController.getAllSubjectList)
  router.post("/api/get/subject-list",  subjectController.getSubjectList)






module.exports = router; 