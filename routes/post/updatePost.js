const express = require("express");
const { Post } = require("../../app/models/postModel");
const multer = require("multer");
const { auth } = require("../../app/middleware/auth");
const updatePostRouter = new express.Router();

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
updatePostRouter.patch(
  "/api/v1/updatePost/:id",
  auth,
  uploadPost.single("post"),
  async (req, res) => {
    const id = req.params.id.replace(":", "");
    const description = req.body.description;
    console.log(description);
    try {
      if (req.body.description != "") {
        console.log(req.body.description);
        const updatePost = await Post.findOneAndUpdate(
          { _id: id, owner: req.user },
          {
            description: req.body.description,
          },
          {
            new: true,
          }
        );
        if (!updatePost) {
          throw new Error("the id is wrong");
        }
        res.send("done");
      } else {
        console.log("field is empty");
      }
      if (req.file != "") {
        const updatePost = await Post.findOneAndUpdate(
          { _id: id, owner: req.user },
          {
            postImage: {
              imageName: req.file.originalname,
              image: req.file.buffer,
            },
          },
          {
            new: true,
          }
        );
        if (!updatePost) {
          throw new Error("the id is wrong");
        }
        res.send("done");
      } else {
        console.log("fields is empty");
      }
    } catch (e) {
      res.status(404).send(e);
    }
  }
);

module.exports = {
  updatePostRouter,
};
