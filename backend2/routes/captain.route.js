const expres = require("express");
const router = expres.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/captain.middleware");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
]);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 8 characters long"),
]);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  userController.getUserProfile
);

router.get("/logout", authMiddleware.authCaptain, userController.logout);
