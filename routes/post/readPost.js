const express = require("express");
const { User } = require("../../app/models/userModel");
const { Post } = require("../../app/models/postModel");
const { auth } = require("../../app/middleware/auth");
const readPostRouter = new express.Router();

readPostRouter.get("/api/v1/myPosts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const posts = await Post.find({ owner: req.user });
    if (!posts) {
      throw new Error("There are no post created");
    }
    const postArray = [];
    let postObj = {};
    for (var i = 0; i < posts.length; i++) {
      postObj = {
        imageName: posts[i].postImage.imageName,
        description: posts[i].description,
        likeCount: posts[i].likeCount,
        commentCount: posts[i].commentOnPost.length,
      };
      postArray.push(postObj);
    }
    res.send({ user, postArray });
  } catch (e) {
    res.status(404).send(e);
  }
});
readPostRouter.get("/api/v1/allPosts", async (req, res) => {
  try {
    const posts = await Post.find({});
    if (!posts) {
      throw new Error("There are no posts");
    }
    const allPostArray = [];
    let allPostObj = {};
    for (var i = 0; i < posts.length; i++) {
      const user = await User.findById(posts[i].owner, {
        email: 0,
        password: 0,
        tokens: 0,
        _id: 0,
        createdAt: 0,
        forgotPasswordToken: 0,
      });
      allPostObj = {
        owner: user.name,
        imageName: posts[i].postImage.imageName,
        description: posts[i].description,
        likeCount: posts[i].likeCount,
        commentCount: posts[i].commentOnPost.length,
        id: posts[i]._id,
      };
      allPostArray.push(allPostObj);
    }
    res.send(allPostArray);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = {
  readPostRouter,
};
