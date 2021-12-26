const express = require("express");
const { User } = require("../../app/models/userModel");
const { Comment } = require("../../app/models/commentModel");
const { Post } = require("../../app/models/postModel");
const { auth } = require("../../app/middleware/auth");
const readCommentRouter = new express.Router();

readCommentRouter.get("/api/v1/comment/:id", auth, async (req, res) => {
  const id = req.params.id.replace(":", "");
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("there is no post");
    }
    const array = post.commentOnPost;
    console.log(array.length);
    const commentInArray = [];
    let commentInObj = {};
    for (var i = 0; i < array.length; i++) {
      const comment = await Comment.findById(array[i]);
      const user = await User.findById(comment.owner);
      commentInObj = {
        id: comment._id,
        comment: comment.comment,
        owner: user.name,
      };
      commentInArray.push(commentInObj);
    }
    res.send(commentInArray);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = {
  readCommentRouter,
};
