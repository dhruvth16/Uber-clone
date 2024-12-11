const expres = require("express");
const router = expres.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware.js");
const captainController = require("../controllers/captain.conroller.js");

router.post(
  "/register-captain",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login-captain",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/captain-profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

router.get(
  "/logout-captain",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

module.exports = router;
