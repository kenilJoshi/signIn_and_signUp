const express = require("express");
const validator = require("validator");
const { User } = require("../app/models/userModel");
const { auth } = require("../app/middleware/auth");
const registerRoutes = new express.Router();

registerRoutes.get("/api/v1/home", auth, (req, res) => {
  res.send("home page for signin and singup");
});
registerRoutes.get("/api/v1/register", (req, res) => {
  console.log(req.query);
  res.send("from register routes");
});
registerRoutes.post("/api/v1/register", async (req, res) => {
  const value = req.body;
  const userPresent = await User.findOne({ email: value.email });
  if (userPresent) {
    res.send("this email is used before");
  } else if (value.name == "") {
    res.send("the name shouldn't be empty");
  } else if (value.email == "" || !validator.isEmail(value.email)) {
    res.send("enter in the format of email or email shouldn't be empty");
  } else if (
    value.password == "" ||
    !validator.isStrongPassword(value.password)
  ) {
    res.send("password is not strong enough or password shouldn't be empty");
  } else {
    const user = new User({
      name: value.name,
      email: value.email,
      password: value.password,
    });
    const token = await user.tokenCreation();
    try {
      await user.save();
      res.status(200).send({ user, token });
    } catch (error) {
      res.status(404).send(error);
    }
  }
});

module.exports = {
  registerRoutes,
};
