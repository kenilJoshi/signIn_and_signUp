const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postImage: {
      imageName: {
        type: String,
        trim: true,
      },
      image: {
        type: Buffer,
      },
    },
    description: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    commentOnPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

module.exports = {
  Post,
};
