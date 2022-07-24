//  import packages
const express = require("express");
const passport = require("passport");

// const controllers
const userCtrl = require("../controllers/user.controller");

//validations
const userValidation = require("../validation/user.validation");

const router = express();

// Admin Repot
router
  .route("/login")
  .post(userValidation.userLoginValidation, userCtrl.userLogin);




module.exports = router;
