const express = require("express");
const app = express();
require("./app/db/mongooseConnect");
const cookieParser = require("cookie-parser");
const { User } = require("./app/models/userModel");
const { registerRoutes } = require("./routes/register_login/registerUser");
const { loginRoutes } = require("./routes/register_login/loginUser");
const { addPostRouter } = require("./routes/post/addPost");
const { readPostRouter } = require("./routes/post/readPost");
const { updatePostRouter } = require("./routes/post/updatePost");
const { deletePostRouter } = require("./routes/post/deletePost");
const { readLikeRouter } = require("./routes/like_comment/readlikes");
const { addCommentRouter } = require("./routes/like_comment/addComment");
const { likePostRouter } = require("./routes/like_comment/addLike");
const { readCommentRouter } = require("./routes/like_comment/readComment");
const { getYourUser } = require("./routes/register_login/readUser");
const { deleteCommentRouter } = require("./routes/like_comment/deleteComment");
const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(registerRoutes);
app.use(loginRoutes);
app.use(addPostRouter);
app.use(readPostRouter);
app.use(updatePostRouter);
app.use(deletePostRouter);
app.use(getYourUser);
app.use(likePostRouter);
app.use(readLikeRouter);
app.use(addCommentRouter);
app.use(readCommentRouter);
app.use(deleteCommentRouter);

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
