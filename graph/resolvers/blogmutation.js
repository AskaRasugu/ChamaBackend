const Blog = require("../../models/blog");
const Comment = require("../../models/comments");

const UserAcc = require("../../models/useraccounts");
const { transformComment, transformBlog, transformuser } = require("./merge");

module.exports = {
  createABlog: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const user = await UserAcc.find({ _id: context.req.userId });
      if (!user) {
        throw new Error("User not found");
      }
      const addedBlog = new Blog({
        title: args.createblog.title,
        slug: args.createblog.slug,
        isFeatured: args.createblog.isFeatured,
        draft: args.createblog.draft,
        image: args.createblog.image,
        excerpt: args.createblog.excerpt,
        content: args.createblog.content,
        creator: context.req.userId,
      });

      const result = await addedBlog.save();

      return transformBlog(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateABlog: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Blog.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Blog has not been updated");
      }
      return transformBlog(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteABlog: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const blog = await Blog.findOne({
        _id: args.blogId,
      });
      if (!blog) {
        throw new Error("Blog not found");
      }

      await Blog.deleteOne({ _id: args.blogId });

      return transformBlog(blog);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createAComment: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      const user = await UserAcc.find({ _id: context.req.userId });
      if (!user) {
        throw new Error("User not found");
      }
      const blog = await UserAcc.find({ _id: args.createcomment.blog });
      if (!blog) {
        throw new Error("Blog not found");
      }
      const addedComment = new Comment({
        blog: args.createcomment.blog,
        description: args.createcomment.description,
        status: args.createcomment.status,
        user: context.req.userId,
      });

      const result = await addedComment.save();

      return transformComment(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateAComment: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      // const supplier = await Supplier.findOne({
      //   _id: args.supplierID,
      // });
      // if (!supplier) {
      //   throw new Error("supplier not found");
      // }
      const input = args.input;
      const result = await Comment.findOneAndUpdate({ _id: input._id }, input, {
        new: true,
      });

      if (!result) {
        throw new Error("Blog has not been updated");
      }
      return transformComment(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteAComment: async (parent, args, context) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }
    try {
      const comment = await Comment.findOne({
        _id: args.commentId,
      });
      if (!comment) {
        throw new Error("Comment not found");
      }

      await Comment.deleteOne({ _id: args.commentId });

      return transformComment(comment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
