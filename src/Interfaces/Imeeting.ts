import { Document, Types } from 'mongoose';

export interface ImeetingModel extends Document {
  fullname: string;
  formcode: string;
  meeting: string;
  email: string;
  cellphone: string;
  studentId: Types.ObjectId;
}

export interface Imeeting {
  fullname: string;
  formcode: string;
  meeting: string;
  email: string;
  cellphone: string
  studentId: Types.ObjectId;
}
