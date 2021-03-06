import { gql } from 'apollo-server';

const typeDefs = gql`
### Custom types
  type User {
    _id: ID
    name: String
    lastname: String
    email: String
    password: String
  }

  type Student {
    _id: ID
    name: String
    lastname: String
    code: String
    degree: String
    completed: Boolean
  }

  type Meeting {
    _id: ID
    fullname: String
    formcode: String
    meeting: EnumSchedule
    email: String
    cellphone: String
    studentId: Student
  }

  type Token {
    token: String
  }

### Enum
  enum EnumSchedule {
    HORAA
    HORAB
    HORAC
  }

### Inputs
  input AddUserInput{
    name: String!
    lastname: String!
    email: String!
    password: String!
  } 

  input LoginInput {
    email: String!
    password: String!
  }

  input MeetingInput {
    fullname: String!
    formcode: String!
    meeting: EnumSchedule!
    email: String!
    cellphone: String!
    studentId: ID!
  }

### Query
  type Query {
    login(input: LoginInput): Token
    getStudent(code: String!): Student
    getStudents(limit: Int, skip: Int): [Student]
    getMeetings(limit: Int, skip: Int ): [Meeting]
    getQuantityMeetings: Int
    getQuantityForTime(schedule: EnumSchedule!): Int
  }

### Mutation
  type Mutation {
    signup(input: AddUserInput): User
    addMeeting(input: MeetingInput): Meeting
  }
`;

export default typeDefs;
