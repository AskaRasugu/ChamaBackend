const AccResolver = require("./login-signupquery");
const ReferenceResolver = require("./referencequery");
const OrderResolver = require("./orderquery");
const AccMutation = require("./login-signupmutation");
const ReferenceMutation = require("./referencemutation");
const OrderMutation = require("./ordermutation");
const SystemSettingMutation = require("./systemsettingmutation");
const SystemSettingResolver = require("./systemsettingquery");
const BlogMutation = require("./blogmutation");
const BlogResolver = require("./blogquery");

const resolvers = {
  Query: {
    ...AccResolver,
    ...ReferenceResolver,
    ...OrderResolver,
    ...SystemSettingResolver,
    ...BlogResolver,
  },
  Mutation: {
    ...AccMutation,
    ...ReferenceMutation,
    ...OrderMutation,
    ...SystemSettingMutation,
    ...BlogMutation,
  },
};

module.exports = resolvers;
