const express = require("express");
const { User } = require("../../app/models/userModel");
const { auth } = require("../../app/middleware/auth");
const getYourUser = new express.Router();

getYourUser.get("/api/v1/myself", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.send(user);
});

module.exports = {
  getYourUser,
};
