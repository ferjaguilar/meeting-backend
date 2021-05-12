import { Document } from 'mongoose';

export interface IuserModel extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface Iuser {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
