import { Schema, model, models, Document, Types } from 'mongoose';

export interface IEnrollment extends Document {
  studentId: Types.ObjectId;
  studentType: 'student' | 'parent';
  courseId: Types.ObjectId;
  status: 'active' | 'completed' | 'dropped';
  enrollmentDate: Date;
  completionDate?: Date;
  progress: number;
}

const EnrollmentSchema = new Schema<IEnrollment>({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Student'
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Course'
  },
  studentType: {
    type: String,
    required: true,
    enum: ['student', 'parent']
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'completed', 'dropped'],
    default: 'active'
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
});

// Create a compound unique index on studentId and courseId
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

export const Enrollment = models.Enrollment || model<IEnrollment>('Enrollment', EnrollmentSchema); 