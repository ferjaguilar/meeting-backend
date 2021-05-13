import { ApolloError, AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { Imeeting } from '../Interfaces/Imeeting';
import { Iuser, IuserContext } from '../Interfaces/Iusers';
import meetingModel from '../models/meetingModel';
import studentModel from '../models/studentModel';
import userModel from '../models/userModel';
import { generateToken } from '../utils/tokenUtils';

exports.resolver = {
  Query: {
    login: async (__:void, { input }:{input:Iuser}) => {
      const findUserInformation = await userModel.findOne({ email: input.email });
      if (!findUserInformation) throw new ApolloError('Email! or password not found');
      if (!bcrypt.compareSync(input.password, findUserInformation.password)) throw new ApolloError('Email! or password not found');

      return {
        token: generateToken(findUserInformation, String(process.env.SECRET), '24h'),
      };
    },
    getStudent: async (__:void, { code }:{ code:string }) => {
      const studentDB = await studentModel.findOne({ code });
      if (studentDB?.completed) {
        throw new ApolloError('Student has already registered', 'NOT_FOUND');
      }
      return studentDB;
    },
  },
  Mutation: {
    signup: async (__:void, { input }:{input:Iuser}, { user }:{user: IuserContext}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      // eslint-disable-next-line no-param-reassign
      input.password = bcrypt.hashSync(input.password, 10);
      const findEmail = await userModel.findOne({ email: input.email });
      if (findEmail) {
        throw new ApolloError('Email already registered');
      }
      const userDB = await userModel.create(input);
      return userDB;
    },
    addMeeting: async (__:void, { input }:{input:Imeeting}) => {
      const findMeeting = await meetingModel.findOne({ studentId: input.studentId });
      if (findMeeting) throw new ApolloError('This student already registered');
      try {
        const meetingDB = await meetingModel.create(input);
        await studentModel.findByIdAndUpdate(input.studentId, { completed: true }, { new: true });
        return meetingDB;
      } catch (error) {
        throw new ApolloError('Failed to save your data');
      }
    },
  },
  Meeting: {
    studentId: async (parent:Imeeting) => {
      try {
        const studentId = await meetingModel.findOne({ studentId: parent.studentId }).populate('studentId');
        return studentId?.studentId;
      } catch (error) {
        throw new ApolloError('Error in relationship');
      }
    },
  },
};
