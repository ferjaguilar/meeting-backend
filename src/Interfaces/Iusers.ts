import { Document, Types } from 'mongoose';

export interface IuserModel extends Document {
  _id?: Types.ObjectId,
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface Iuser {
  _id?: Types.ObjectId,
  name: string;
  lastname: string;
  email: string;
  password: string;
}
