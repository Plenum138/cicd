// Importing express module
const express = require("express")
const router = express.Router()
const planController = require('../../controllers/planController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // plan API
  router.post("/api/create/plan", authenticateJWT, planController.createPlan)
  router.post("/api/update/plan", authenticateJWT, planController.updatePlan)
  router.post("/api/delete/plan", authenticateJWT, planController.deletePlan)
  router.post("/api/getAll/plan-list", authenticateJWT, planController.getAllPlanList)
  router.post("/api/get/plan-list",  planController.getPlanList)
  router.post("/api/get/user-plan-list",  planController.getUserPlanList)







module.exports = router; 