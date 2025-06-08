import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';

export interface IChild extends Document {
  firstName: string;
  lastName: string;
  age: number;
  parent: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const childSchema = new Schema<IChild>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

export const Child = mongoose.models.Child || mongoose.model<IChild>('Child', childSchema); 