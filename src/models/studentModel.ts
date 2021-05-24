import mongoose, { Schema } from 'mongoose';
import { Istudents } from '../Interfaces/Istudents';

const studentSchema = new Schema({
  name: { type: String, trim: true, required: [true, 'Name is required'] },
  lastname: { type: String, trim: true, required: [true, 'Lastname is required'] },
  code: { type: String, trim: true, required: [true, 'Student code is required'] },
  degree: { type: String, trim: true, required: [true, 'Degree is required'] },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<Istudents>('Students', studentSchema);
