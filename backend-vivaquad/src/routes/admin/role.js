// Importing express module
const express = require("express")
const router = express.Router()
const roleController = require('../../controllers/roleController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')


router.use(cors());
  // EMPLOYEE ROLE API
  router.post("/api/create/role", authenticateJWT, roleController.createRole)
  router.post("/api/update/role", authenticateJWT, roleController.updateRole)
  router.post("/api/delete/role", authenticateJWT, roleController.deleteRole)
  router.post("/api/getAll/role-list", authenticateJWT, roleController.getAllRoleList)
  router.get("/api/get/role-list",  roleController.getRoleList)






module.exports = router;