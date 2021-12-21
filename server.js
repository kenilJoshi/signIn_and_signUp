const express = require("express");
const app = express();
require("./app/db/mongooseConnect");
const cookieParser = require("cookie-parser");
const { registerRoutes } = require("./routes/registerUser");
const { loginRoutes } = require("./routes/loginUser");
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(registerRoutes);
app.use(loginRoutes);

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
