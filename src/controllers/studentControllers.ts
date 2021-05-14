import { ApolloError } from 'apollo-server';
import studentModel from '../models/studentModel';

const getStudent = async (code:string) => {
  const studentDB = await studentModel.findOne({ code });
  if (studentDB?.completed) {
    throw new ApolloError('Student has already registered', 'NOT_FOUND');
  }
  return studentDB;
};

export default {
  getStudent,
};
