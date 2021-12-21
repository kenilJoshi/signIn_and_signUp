const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://Bkj:Bkj%405454721@cluster0.k3tur.mongodb.net/SignIn_And_SignUp?retryWrites=true&w=majority";

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
