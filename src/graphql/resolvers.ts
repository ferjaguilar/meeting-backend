import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel';

exports.resolver = {
  Query: {
    hello: () => 'world',
  },
  Mutation: {
    signup: async (__:void, { input }: any) => {
      // eslint-disable-next-line no-param-reassign
      input.password = bcrypt.hashSync(input.password, 10);
      const findEmail = await userModel.findOne({ email: input.email });
      if (findEmail) {
        throw new ApolloError('Email already registered');
      }
      const userDB = await userModel.create(input);
      return userDB;
    },
  },
};
