import User from "../models/User.js";
import { signToken } from "../services/auth.js";

export const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");

        return userData;
      }
      throw new Error("Not logged in!");
    },
  },

  Mutation: {
    addUser: async (
      _parent: any,
      args: { username: string; email: string; password: string }
    ) => {
      const user = await User.create(args);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (
      _parent: any,
      { bookData }: { bookData: any },
      context: any
    ) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        ).populate("savedBooks");

        return updatedUser;
      }
      throw new Error("You need to be logged in!");
    },

    removeBook: async (
      _parent: any,
      { bookId }: { bookId: string },
      context: any
    ) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        ).populate("savedBooks");

        return updatedUser;
      }
      throw new Error("You need to be logged in!");
    },
  },
};
