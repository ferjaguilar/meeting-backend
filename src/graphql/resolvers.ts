import { Imeeting } from '../Interfaces/Imeeting';
import { Iuser, IuserContext } from '../Interfaces/Iusers';
import userControllers from '../controllers/userControllers';
import studentControllers from '../controllers/studentControllers';
import meetingControllers from '../controllers/meetingControllers';

const resolvers = {
  Query: {
    // Users Querys
    login: async (__:void, { input }:{input:Iuser}) =>
      userControllers.login(input),

    // Students Querys
    getStudent: async (__:void, { code }:{ code:string }) =>
      studentControllers.getStudent(code),

    getStudents: async (__:void, { limit, skip }:{limit:number, skip:number}, { user }:{user: IuserContext}) =>
      studentControllers.getStudents(limit, skip, user),

    // Meeting Querys
    getMeetings: async (__:void, { limit, skip }:{limit:number, skip:number}, { user }:{user: IuserContext}) =>
      meetingControllers.getMeetings(limit, skip, user),

    getQuantityMeetings: async (_:void, __:void, { user }:{user: IuserContext}) =>
      meetingControllers.getQuantityMeetings(user),

    getQuantityForTime: async (__:void, { schedule }:{schedule:string}, { user }:{user: IuserContext}) =>
      meetingControllers.getQuantityForTime(schedule, user),

  },
  Mutation: {
    // Users Querys
    signup: async (__:void, { input }:{input:Iuser}, { user }:{user: IuserContext}) =>
      userControllers.signup(input, user),

    // Meeting Querys
    addMeeting: async (__:void, { input }:{input:Imeeting}) =>
      meetingControllers.addMeeting(input),
  },
  Meeting: {
    studentId: async (parent:Imeeting) =>
      meetingControllers.studentId(parent),
  },
};

export default resolvers;
