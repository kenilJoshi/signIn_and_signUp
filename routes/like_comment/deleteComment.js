const express = require("express");
const { Comment } = require("../../app/models/commentModel");
const { auth } = require("../../app/middleware/auth");
const deleteCommentRouter = new express.Router();

deleteCommentRouter.delete(
  "/api/v1/deleteComment/:id",
  auth,
  async (req, res) => {
    const id = req.params.id.replace(":", "");
    try {
      await Comment.findOneAndDelete({ _id: id, owner: req.user });
      res.send("done");
    } catch (e) {
      res.send(e);
    }
  }
);

module.exports = {
  deleteCommentRouter,
};
