// Importing express module
const express = require("express")
const router = express.Router()
const announcementController = require('../../controllers/announcementController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // ANNOUNCEMENT API
  router.post("/api/create/announcement", authenticateJWT, announcementController.createAnnouncement)
  router.post("/api/update/announcement", authenticateJWT, announcementController.updateAnnouncement)
  router.post("/api/delete/announcement", authenticateJWT, announcementController.deleteAnnouncement)
  router.post("/api/getAll/announcement-list", authenticateJWT, announcementController.getAllAnnouncementList)
  router.post("/api/get/announcement-list",  announcementController.getAnnouncementList)






module.exports = router; 