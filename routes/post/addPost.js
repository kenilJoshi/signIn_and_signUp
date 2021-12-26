const express = require("express");
const { Post } = require("../../app/models/postModel");
const { auth } = require("../../app/middleware/auth");
const multer = require("multer");

const addPostRouter = new express.Router();

const uploadPost = multer({
  limits: { fileSize: 10000000 },
  fileFilter(req, file, cd) {
    if (file.originalname.endsWith(".jpg")) {
      cd(undefined, true);
    } else if (file.originalname.endsWith(".png")) {
      cd(undefined, true);
    } else {
      return cd(new Error("It only supports .jpg and .png upload"));
    }
  },
});
addPostRouter.post(
  "/api/v1/addPost",
  auth,
  uploadPost.single("post"),
  async (req, res) => {
    const postDetails = new Post({
      postImage: {
        imageName: req.file.originalname,
        image: req.file.buffer,
      },
      description: req.body.description,
      owner: req.user,
    });
    try {
      await postDetails.save();
      res.json({
        postImage: postDetails.postImage.imageName,
        description: postDetails.description,
        likeCount: postDetails.likeCount,
        commentCount: postDetails.commentOnPost.length,
        owner: postDetails.owner,
      });
    } catch (e) {
      res.send(e);
    }
  }
);

module.exports = {
  addPostRouter,
};
