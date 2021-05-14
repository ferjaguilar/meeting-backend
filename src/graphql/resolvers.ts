import { ApolloError, AuthenticationError } from 'apollo-server';
import { Imeeting } from '../Interfaces/Imeeting';
import { Iuser, IuserContext } from '../Interfaces/Iusers';
import meetingModel from '../models/meetingModel';
import studentModel from '../models/studentModel';
import userController from '../controllers/userControllers';

exports.resolver = {
  Query: {
    login: async (__:void, { input }:{input:Iuser}) => userController.login(input),
    getStudent: async (__:void, { code }:{ code:string }) => {
      const studentDB = await studentModel.findOne({ code });
      if (studentDB?.completed) {
        throw new ApolloError('Student has already registered', 'NOT_FOUND');
      }
      return studentDB;
    },
    // eslint-disable-next-line max-len
    getMeetings: async (__:void, { limit, skip }:{limit:number, skip:number}, { user }:{user: IuserContext}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const queryLimit = limit || 5;
      const querySkip = skip || 0;

      try {
        const meetingDB = await meetingModel.find().limit(queryLimit).skip(querySkip);
        return meetingDB;
      } catch (error) {
        throw new ApolloError('An error has occurred');
      }
    },
    getQuantityMeetings: async (_:void, __:void, { user }:{user: IuserContext}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      try {
        const meetingDB = await meetingModel.countDocuments();
        return meetingDB;
      } catch (error) {
        throw new ApolloError("Can't get quantity meetings");
      }
    },
    // eslint-disable-next-line max-len
    getQuantityForTime: async (__:void, { schedule }:{schedule:string}, { user }:{user: IuserContext}) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      try {
        const meetingDB = await meetingModel.countDocuments({ meeting: schedule });
        return meetingDB;
      } catch (error) {
        throw new ApolloError("Can't get quantity meetings for time");
      }
    },
  },
  Mutation: {
    // eslint-disable-next-line max-len
    signup: async (__:void, { input }:{input:Iuser}, { user }:{user: IuserContext}) => userController.signup(input, user),
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
