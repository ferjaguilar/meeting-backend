import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { Iuser } from '../Interfaces/Iusers';
import userModel from '../models/userModel';
import generateToken from '../utils/generateToken';

exports.resolver = {
  Query: {
    login: async (__:void, { input }:{input:Iuser}) => {
      const findUserInformation = await userModel.findOne({ email: input.email });
      if (!findUserInformation) throw new ApolloError('Email! or password not found');
      if (!bcrypt.compareSync(input.password, findUserInformation.password)) throw new ApolloError('Email! or password not found');

      return {
        token: generateToken(input, String(process.env.SECRET), '24h'),
      };
    },
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
