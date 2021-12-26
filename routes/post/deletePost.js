const express = require("express");
const { Post } = require("../../app/models/postModel");
const { auth } = require("../../app/middleware/auth");
const deletePostRouter = new express.Router();

deletePostRouter.delete("/api/v1/deletePost/:id", auth, async (req, res) => {
  const id = req.params.id.replace(":", "");
  try {
    await Post.findOneAndDelete({
      _id: id,
      owner: req.user,
    });
    res.send("deleted");
  } catch (e) {
    res.send(e);
  }
});

module.exports = {
  deletePostRouter,
};
