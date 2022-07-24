//   packages
const express = require("express");
const passport = require("passport");

//  controllers
const movieCtrl = require("../controllers/movie.controller");

//validations
const userValidation = require("../validation/user.validation");

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


module.exports = router;
