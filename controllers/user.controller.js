// import package

// import modal
const Admin = require("../models/admin");

const bcrypt = require("bcrypt");



exports.userLogin = async (req, res) => {
  try {
    let reqBody = req.body,
      checkUser;
    reqBody.email = reqBody.email.toLowerCase();
    checkUser = await Admin.findOne({ email: reqBody.email });
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, errors: { email: "Email is not exists" } });
    }

    var passwordStatus = bcrypt.compareSync(
      reqBody.password,
      checkUser.password
    );

    if (!passwordStatus) {
      return res
        .status(400)
        .json({ success: false, errors: { password: "Invalid Password" } });
    }

    let payloadData = {
      _id: checkUser._id
    };
    let token = new Admin().generateJWT(payloadData);

    res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 });
    let result = {
      _id: checkUser._id,
      email: checkUser.email,
    };

    return res
      .status(200)
      .json({ success: true, message: "Login successfully", result });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, errors: { messages: "Error on server" } });
  }
};






