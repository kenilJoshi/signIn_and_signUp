const express = require("express");
const { User } = require("../../app/models/userModel");
const { Post } = require("../../app/models/postModel");
const { Comment } = require("../../app/models/commentModel");
const { auth } = require("../../app/middleware/auth");
const addCommentRouter = new express.Router();

addCommentRouter.post("/api/v1/postComment/:id", auth, async (req, res) => {
  const id = req.params.id.replace(":", "");
  try {
    const user = await User.findById(req.user, {
      email: 0,
      password: 0,
      tokens: 0,
      _id: 0,
      createdAt: 0,
      forgotPasswordToken: 0,
    });
    const post = await Post.findById(id);
    const comment = new Comment({
      comment: req.body.comment,
      owner: req.user,
      postId: post._id,
    });
    post.commentOnPost.push(comment._id);
    await comment.save();
    await post.save();
    res.send({
      comment,
      post: {
        postImage: post.postImage.imageName,
        description: post.description,
        likeCount: post.likeCount,
        commentCount: post.commentOnPost.length,
        owner: user.name,
      },
    });
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = {
  addCommentRouter,
};
