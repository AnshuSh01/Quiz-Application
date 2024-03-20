const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      msg: "Error in requireSignIn middleware",
    });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const User = await userModel.findById(req.user._id);
    if (User.role === 1) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        msg: "isAdmin error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      msg: "Error in isAdmin middleware",
    });
  }
};
module.exports = { requireSignIn, isAdmin };
