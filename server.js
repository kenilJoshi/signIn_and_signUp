const express = require("express");
const app = express();
require("./app/db/mongooseConnect");
const cookieParser = require("cookie-parser");
const { registerRoutes } = require("./routes/registerUser");
const { loginRoutes } = require("./routes/loginUser");

app.use(cookieParser());
app.use(express.json());
app.use(registerRoutes);
app.use(loginRoutes);

app.listen(3000, () => {
  console.log("server is listening at 3000");
});
