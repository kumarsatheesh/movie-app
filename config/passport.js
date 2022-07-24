//import npm package
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

//import function
import config from "./config";

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = config.secretOrKey;

//import model
import Admin from "../models/admin";


export const adminAuth = (passport) => {
  passport.use(
    "adminAuth",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      Admin.findById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        } else if (user) {
          let data = {
            id: user._id,
            name: user.name,
          };
          return done(null, data);
        }
        return done(null, false);
      });
    })
  );
};
