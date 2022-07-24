// import packages
const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");



// const  routes
const movie = require("./routes/movie.js");
const user = require("./routes/user.js");


// config
const config = require("./config/config");

const app = express();
const server = http.createServer(app);

// compress responses
app.use(morgan("dev"));
app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
// include passport stratagy

require("./config/passport").adminAuth(passport);

app.use("/", express.static(path.join(__dirname, "public")));

// Database connection
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB successfully connected."))
  .catch((err) => console.log(err));



app.use("/movies", movie);
app.use("/", user);


app.get("/", (req, res) => {
  return res.send("User Service Working");
});

server.listen(config.port, function () {
  console.log(`server is running on port ${config.port}`);
});
