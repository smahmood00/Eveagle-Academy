import { Schema, model, models, Document, Types } from 'mongoose';

export interface IPayment extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  stripeSessionId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit' | 'debit' | 'fps' | 'other';
  fpsScreenshotUrl?: string;
  fpsVerifiedAt?: Date;
  createdAt: Date;
  completedAt?: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course'
  },
  stripeSessionId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    index: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'HKD'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit', 'debit', 'fps', 'other']
  },
  fpsScreenshotUrl: {
    type: String,
    required: false
  },
  fpsVerifiedAt: {
    type: Date,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

export const Payment = models.Payment || model<IPayment>('Payment', PaymentSchema); 