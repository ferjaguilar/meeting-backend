import { Document, Types } from 'mongoose';

export interface Imeeting extends Document {
  fullname: string;
  formcode: string;
  meeting: string;
  email: string;
  cellphone: string
  studentId: Types.ObjectId
}
