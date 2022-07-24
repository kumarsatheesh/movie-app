// import package
const mongoose = require("mongoose");

// const helpers
const isEmpty = require("../config/isEmpty");

/**
 * User Login
 * URL : /api/login
 * METHOD: POST
 * BODY : email, phoneNo, phoneCode, loginType (1-mobile, 2-email), password
 */
exports.userLoginValidation = (req, res, next) => {
  let errors = {},
    reqBody = req.body;
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
  let mobileRegex = /^\d+$/;

  if (isEmpty(reqBody.password)) {
    errors.password = "password field is required";
  }

  if (isEmpty(reqBody.email)) {
    errors.email = "Email field is required";
  } else if (!emailRegex.test(reqBody.email)) {
    errors.email = "Email is invalid";
  }

  if (!isEmpty(errors)) {
    return res.status(400).json({ errors: errors });
  }

  return next();
};



exports.movieValidation = (req, res, next) => {
  let errors = {},
    reqBody = req.body;


  if (isEmpty(reqBody.name)) {
    errors.name = "Name is required";
  }
  if (isEmpty(reqBody.genre)) {
    errors.genre = "Genre is required";
  }
  if (isEmpty(reqBody.releasedate)) {
    errors.releasedate = "Release Date is required";
  }

  if (!isEmpty(errors)) {
    return res.status(400).json({ errors: errors });
  }

  return next();
};