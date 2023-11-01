const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserAcc",
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserAcc",
      },
    ],
  },
  //mongoose will add a created at and updated at.
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
