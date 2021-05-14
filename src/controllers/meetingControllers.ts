import { ApolloError, AuthenticationError } from 'apollo-server';
import { Imeeting } from '../Interfaces/Imeeting';
import { IuserContext } from '../Interfaces/Iusers';
import meetingModel from '../models/meetingModel';
import studentModel from '../models/studentModel';

const addMeeting = async (input:Imeeting) => {
  const findMeeting = await meetingModel.findOne({ studentId: input.studentId });
  if (findMeeting) throw new ApolloError('This student already registered');
  try {
    const meetingDB = await meetingModel.create(input);
    await studentModel.findByIdAndUpdate(input.studentId, { completed: true }, { new: true });
    return meetingDB;
  } catch (error) {
    throw new ApolloError('Failed to save your data');
  }
};

const studentId = async (parent:Imeeting) => {
  try {
    const studentDB = await meetingModel.findOne({ studentId: parent.studentId }).populate('studentId');
    return studentDB?.studentId;
  } catch (error) {
    throw new ApolloError('Error in relationship');
  }
};

const getMeetings = async (limit:number, skip:number, user:IuserContext) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const queryLimit = limit || 5;
  const querySkip = skip || 0;

  try {
    const meetingDB = await meetingModel.find().limit(queryLimit).skip(querySkip);
    return meetingDB;
  } catch (error) {
    throw new ApolloError('An error has occurred');
  }
};

const getQuantityMeetings = async (user:IuserContext) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  try {
    const meetingDB = await meetingModel.countDocuments();
    return meetingDB;
  } catch (error) {
    throw new ApolloError("Can't get quantity meetings");
  }
};

const getQuantityForTime = async (schedule:string, user:IuserContext) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  try {
    const meetingDB = await meetingModel.countDocuments({ meeting: schedule });
    return meetingDB;
  } catch (error) {
    throw new ApolloError("Can't get quantity meetings for time");
  }
};

export default {
  addMeeting,
  studentId,
  getMeetings,
  getQuantityMeetings,
  getQuantityForTime,
};
