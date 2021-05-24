import { Document } from 'mongoose';

export interface Istudents extends Document {
  name: string;
  lastname: string;
  code: string;
  degree: string;
  completed: boolean;
}
