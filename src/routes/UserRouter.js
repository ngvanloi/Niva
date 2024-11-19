const express = require("express");
const userController = require("../controllers/UserController");
const { authMiddleware, authUserMiddleware } = require("../middlewares/authMiddleWare");

const router = express.Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/details/:id", authUserMiddleware, userController.getDetailsUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.delete("/", authMiddleware, userController.deleteManyUsers);
router.get("/refresh-token", userController.refreshToken);

module.exports = router;
