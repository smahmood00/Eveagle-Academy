import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  phoneNumber?: string;
  isVerified: boolean;
  children: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  phoneNumber: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Child'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 