const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

/* existing routes */
router.post("/register", authController.userRegisterController);
router.post("/login", authController.userLoginController);
router.post("/logout", authController.userLogoutController);

/* NEW: get current user */
router.get("/me", authMiddleware.authMiddleware, authController.userMeController);

module.exports = router;
