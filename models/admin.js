// import package
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//  lib
const config = require('../config/config');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

AdminSchema.methods.generateJWT = function (payload) {
    var token = jwt.sign(payload, config.secretOrKey);
    return `${token}`;
};

const Admin = mongoose.model("admin", AdminSchema, "admin");

module.exports = Admin;