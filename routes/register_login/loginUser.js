const express = require("express");
const { User } = require("../../app/models/userModel");
const loginRoutes = new express.Router();

loginRoutes.post("/api/v1/login", async (req, res) => {
  if (req.body.email == "" || req.body.password == "") {
    res.send("email or password cant be kept empty");
  } else {
    try {
      const findUser = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await findUser.tokenCreation();
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).send({ findUser, token });
    } catch (error) {
      res.status(404).send(error);
    }
  }
});
loginRoutes.post("/api/v1/forgotPassword", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send("ther is no user of this email");
  } else {
    try {
      const token = await user.forgortPassword();
      res.status(200).send(`${token} it will expire in 5 min so use it`);
    } catch (error) {
      res.status(404).send("something went wrong");
    }
  }
});
loginRoutes.patch("/api/v1/resetPassword/:id", async (req, res) => {
  const forgotPasswordToken = req.params.id.replace(":", "");
  console.log(forgotPasswordToken);
  const user = await User.findOne({ forgotPasswordToken });
  if (!user) {
    res.status(404).send("the token is wrong");
  }
  user.password = req.body.password;

  try {
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send("something went wrong");
  }
});

module.exports = {
  loginRoutes,
};
