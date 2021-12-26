const express = require("express");
const { User } = require("../../app/models/userModel");
const { Post } = require("../../app/models/postModel");
const { auth } = require("../../app/middleware/auth");
const readLikeRouter = new express.Router();

readLikeRouter.get("/api/v1/readMyLike", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const likePostArray = [];
    let likePostObj = {};
    for (var i = 0; i < user.likedPost.length; i++) {
      const post = await Post.findById(user.likedPost[i]);
      if (!post) {
        throw new Error("there are no post");
      }
      const allUser = await User.findById(post.owner, {
        email: 0,
        password: 0,
        tokens: 0,
        _id: 0,
        createdAt: 0,
        forgotPasswordToken: 0,
      });
      likePostObj = {
        owner: allUser.name,
        imageName: post.postImage.imageName,
        description: post.description,
        likeCount: post.likeCount,
        commentCount: post.commentOnPost.length,
        id: post._id,
      };
      likePostArray.push(likePostObj);
    }
    res.send(likePostArray);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = {
  readLikeRouter,
};
