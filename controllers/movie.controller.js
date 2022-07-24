// import package

// import modal
import Admin from "../models/admin";

import bcrypt from "bcrypt";
import config from "../config/config";

import mongoose from "mongoose";

import Movies from "../models/movies";



export const addMovie = async (req, res) => {
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



export const updateMovie = async (req, res) => {
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

export const getSingleMovie = async (req, res) => {
  Movies.findOne({ _id: req.params.id, status: 1 }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

export const movieList = async (req, res) => {
  Movies.find({ status: 1 }, (err, userData) => {
    if (err) {
      return res
        .status(200)
        .json({ success: false, errors: { messages: "Error on server" } });
    }

    return res.status(200).json({ success: true, userValue: userData });
  });
};

export const deleteMovie = async (req, res) => {
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




