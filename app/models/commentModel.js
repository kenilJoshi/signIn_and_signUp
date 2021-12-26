const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "posts",
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  Comment,
};
