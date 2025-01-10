const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post(
  "register-user",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.registerUser
);

router.post(
  "login-user",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.loginUser
);

router.get(
  "user-profile",
  authMiddleware.authUser,
  userController.getUserProfile
);

router.get("logout-user", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
