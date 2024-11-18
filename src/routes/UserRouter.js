const express = require('express')
const userController = require('../controllers/UserController')

const router = express.Router()

router.post("/sign-up", userController.signUp)
router.post("/sign-in", userController.signIn)
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getDetailsUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
router.delete("/", userController.deleteManyUsers)

module.exports = router