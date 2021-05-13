import mongoose, { Schema } from 'mongoose';
import { Imeeting } from '../Interfaces/Imeeting';

const schedule = ['HORAA', 'HORAB', 'HORAC'];

const meetingSchema = new Schema({
  fullname: { type: String, trim: true, required: [true, 'Fullname is required'] },
  formcode: {
    type: String,
    trim: true,
    required: [true, 'Formcode is required'],
    min: 4,
    max: 4,
  },
  meeting: { type: String, trim: true, enum: schedule },
  email: { type: String, trim: true, required: [true, 'Email is required'] },
  cellphone: { type: String, trim: true, required: [true, 'Cellphone is required'] },
  studentId: { type: Schema.Types.ObjectId, required: [true, 'StudentId is required'], ref: 'Students' },
}, { timestamps: true });

export default mongoose.model<Imeeting>('Meeting', meetingSchema);
