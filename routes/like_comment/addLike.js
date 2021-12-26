const express = require("express");
const { User } = require("../../app/models/userModel");
const { Post } = require("../../app/models/postModel");
const { auth } = require("../../app/middleware/auth");
const likePostRouter = new express.Router();

likePostRouter.post("/api/v1/likePost/:id", auth, async (req, res) => {
  const id = req.params.id.replace(":", "");
  try {
    const user = await User.findById(req.user);
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("there is no such post");
    }
    if (user.likedPost.length == 0) {
      user.likedPost.push(post._id);
      post.likeCount = post.likeCount + 1;
    } else if (user.likedPost.length != 0) {
      //console.log(id);
      const findInArray = user.likedPost.find((element) => {
        if (element.toString() == id) {
          return element.toString();
        }
      });
      console.log(findInArray);
      if (!findInArray) {
        user.likedPost.push(post._id);
        post.likeCount = post.likeCount + 1;
      } else {
        console.log(user.likedPost[0]);
        // user.likedPost.filter(
        //   (element) => element.toString() !== findInArray.toString()
        // );
        for (var i = 0; i < user.likedPost.length; i++) {
          if (user.likedPost[i] === findInArray) {
            user.likedPost.splice(i, 1);
          }
        }
        post.likeCount = post.likeCount - 1;
      }
    }
    await user.save();
    await post.save();
    res.json({
      user,
      post: {
        postImage: post.postImage.imageName,
        description: post.description,
        likeCount: post.likeCount,
        commentCount: post.commentOnPost.length,
      },
    });
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = {
  likePostRouter,
};
