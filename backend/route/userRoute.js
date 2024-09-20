const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/verifyToken");
const { body } = require("express-validator");
const { validateRequest } = require("../helper/helper");
router.post(
  "/signup",
  [
    body("userName").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("password is required"),
    validateRequest,
  ],
  async (req, res) => {
    try {
      await userController.signupUser(req, res);
    } catch (error) {
      console.log("error", error);
    }
  }
);

router.post("/login", [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("password is required"),
    validateRequest,
  ],async (req, res) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/userdata", verifyToken, async (req, res) => {
  try {
    await userController.userData(req, res);
  } catch (error) {
    console.log("error", error);
  }
});
module.exports = router;
