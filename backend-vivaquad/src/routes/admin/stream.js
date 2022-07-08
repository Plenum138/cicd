// Importing express module
const express = require("express")
const router = express.Router()
const streamController = require('../../controllers/streamController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // STREAM API
  router.post("/api/create/stream", authenticateJWT, streamController.createStream)
  router.post("/api/update/stream", authenticateJWT, streamController.updateStream)
  router.post("/api/delete/stream", authenticateJWT, streamController.deleteStream)
  router.post("/api/getAll/stream-list", authenticateJWT, streamController.getAllStreamList)
  router.get("/api/get/stream-list",  streamController.getStreamList)



 


module.exports = router; 