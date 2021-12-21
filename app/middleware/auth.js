const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    req.header("Authorization").replace("Bearer", "");
  if (!token) {
    res.status(404).send("Token is missing");
  }
  try {
    const decode = jwt.verify(token, "thismyfirsttoken");
    req.user = decode;
  } catch (error) {
    res.status(404).send("something went wrong");
  }
  return next();
};

module.exports = {
  auth,
};
