import { Document } from 'mongoose';

export interface Iuser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
