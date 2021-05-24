import { ApolloError, AuthenticationError } from 'apollo-server';
import { IuserContext } from '../Interfaces/Iusers';
import studentModel from '../models/studentModel';

const getStudent = async (code:string) => {
  const studentDB = await studentModel.findOne({ code });
  if (studentDB?.completed) {
    throw new ApolloError('Student has already registered', 'NOT_FOUND');
  }
  return studentDB;
};

const getStudents = async (limit:number, skip:number, user:IuserContext) => {
  if (!user) throw new AuthenticationError('You must be logged in');
  const queryLimit = limit || 5;
  const querySkip = skip || 0;
  try {
    const studentDB = await studentModel.find().limit(queryLimit).skip(querySkip);
    return studentDB;
  } catch (error) {
    throw new ApolloError('An error has occurred');
  }
};

export default {
  getStudent,
  getStudents,
};
