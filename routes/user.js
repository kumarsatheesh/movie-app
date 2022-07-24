//  import packages
import express from "express";
import passport from "passport";

// import controllers
import * as userCtrl from "../controllers/user.controller";

//validations
import * as userValidation from "../validation/user.validation";

const router = express();

// Admin Repot
router
  .route("/login")
  .post(userValidation.userLoginValidation, userCtrl.userLogin);




export default router;
