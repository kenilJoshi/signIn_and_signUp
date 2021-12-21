const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    forgotPasswordToken: {
      type: String,
      expires: "5m",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.tokenCreation = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thismyfirsttoken", {
    expiresIn: "2h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("email or password is wrong enable to login");
  }
  const matchThePassword = await bcrypt.compare(password, user.password);
  if (!matchThePassword) {
    throw new Error("email or password is wrong enable to login");
  }
  return user;
};
userSchema.methods.forgortPassword = async function () {
  const user = this;
  const forgotToken = crypto.randomBytes(20).toString("hex");
  user.forgotPasswordToken = forgotToken;
  await user.save();
  return forgotToken;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
