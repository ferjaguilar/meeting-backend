import mongoose, { Schema } from 'mongoose';
import { Iuser } from '../Interfaces/Iusers';

const userSchema = new Schema({
  name: { type: String, trim: true, required: [true, 'Name is required'] },
  lastname: { type: String, trim: true, required: [true, 'Lastname is required'] },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: { type: String, trim: true, required: [true, 'Password is required'] },
}, { timestamps: true });

export default mongoose.model<Iuser>('Users', userSchema);
