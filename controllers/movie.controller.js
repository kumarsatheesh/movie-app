// import package

// import modal
const Admin = require("../models/admin");

const bcrypt = require("bcrypt");
const config = require("../config/config");

const mongoose = require("mongoose");

const Movies = require("../models/movies");



exports.addMovie = async (req, res) => {
  try {


    var reqBody = req.body;





    let newUserData = new Movies({
      name: reqBody.name,
      rating: reqBody.rating,
      cast: reqBody.cast,
      genre: reqBody.genre,
      releasedate: reqBody.releasedate,
    });

    let newDoc = await newUserData.save();
    // }
    return res
      .status(200)
      .json({ success: true, message: "Movie  Added Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};



exports.updateMovie = async (req, res) => {
  try {
    var reqBody = req.body;
    var test = await Movies.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      {
        name: reqBody.name,
        rating: reqBody.rating,
        cast: reqBody.cast,
        genre: reqBody.genre,
        releasedate: reqBody.releasedate,
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Movie Updated Successfully", });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};

exports.getSingleMovie = async (req, res) => {
  Movies.findOne({ _id: req.params.id, status: 1 }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

exports.movieList = async (req, res) => {
  Movies.find({ status: 1 }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

exports.deleteMovie = async (req, res) => {
  try {
    let deletebanner = await Movies.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.id) },
      { status: 0 },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Movie Deleted Successfully" });
  } catch (err) {

    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};




