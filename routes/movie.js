//  import packages
import express from "express";
import passport from "passport";

// import controllers
import * as movieCtrl from "../controllers/movie.controller";

//validations
import * as userValidation from "../validation/user.validation";

const router = express();
const passportAuth = passport.authenticate("adminAuth", { session: false });
// Admin Repot


router.route("/").get(movieCtrl.movieList);
router.route("/:id").get(movieCtrl.getSingleMovie);
router.route("/:id").delete(passportAuth, movieCtrl.deleteMovie);

router
  .route("/")
  .post(

    userValidation.movieValidation,
    movieCtrl.addMovie

  );

router
  .route("/:id")
  .put(
    passportAuth,
    movieCtrl.updateMovie
  );


export default router;
