const Blog = require("../../models/blog");
const Comment = require("../../models/comments");

const UserAcc = require("../../models/useraccounts");

const { transformComment, transformBlog, transformuser } = require("./merge");

module.exports = {
  allBlogs: async (_, args, context, req) => {
    try {
      //find all users
      const blogs = await Blog.find().skip(args.offset).limit(args.limit);

      return blogs.map((blog) => {
        //return a well formed details about users
        return transformBlog(blog);
      });
    } catch (err) {
      throw err;
    }
  },
  activeBlogs: async (_, args, context, req) => {
    try {
      //find all users
      const blogs = await Blog.find({ draft: false })
        .skip(args.offset)
        .limit(args.limit);

      return blogs.map((blog) => {
        //return a well formed details about users
        return transformBlog(blog);
      });
    } catch (err) {
      throw err;
    }
  },
  usersBlogs: async (_, args, context, req) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      //find all users
      const blogs = await Blog.find({ creator: context.req.userId })
        .skip(args.offset)
        .limit(args.limit);

      return blogs.map((blog) => {
        //return a well formed details about users
        return transformBlog(blog);
      });
    } catch (err) {
      throw err;
    }
  },
  oneBlog: async (_, args, context) => {
    const blog = await Blog.findOne({ _id: args.blogId });
    if (!blog) {
      throw new Error("Blog does not exist");
    }

    const isblog = transformBlog(blog);
    return isblog;
  },
  allComments: async (_, args, context, req) => {
    try {
      //find all users
      const comments = await Comment.find().skip(args.offset).limit(args.limit);

      return comments.map((comment) => {
        //return a well formed details about users
        return transformComment(comment);
      });
    } catch (err) {
      throw err;
    }
  },
  usersComments: async (_, args, context, req) => {
    if (!context.req.isAuth) {
      throw new Error("unauthorized");
    }

    try {
      //find all users
      const comments = await Comment.find({ creator: context.req.userId })
        .skip(args.offset)
        .limit(args.limit);

      return comments.map((comment) => {
        //return a well formed details about users
        return transformComment(comment);
      });
    } catch (err) {
      throw err;
    }
  },
  blogsComments: async (_, args, context, req) => {
    try {
      //find all users
      const comments = await Comment.find({ blog: args.blogId })
        .skip(args.offset)
        .limit(args.limit);

      return comments.map((comment) => {
        //return a well formed details about users
        return transformComment(comment);
      });
    } catch (err) {
      throw err;
    }
  },
  oneComment: async (_, args, context) => {
    const comment = await Comment.findOne({ _id: args.blogId });
    if (!comment) {
      throw new Error("Blog does not exist");
    }

    const iscomment = transformComment(comment);
    return iscomment;
  },
};
