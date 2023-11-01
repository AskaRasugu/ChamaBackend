const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String },
    isFeatured: { type: Boolean, default: false },
    draft: { type: Boolean, default: false },
    image: { type: String },
    excerpt: { type: String },
    content: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "UserAcc" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
