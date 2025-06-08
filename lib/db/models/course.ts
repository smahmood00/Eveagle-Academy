import { Schema, model, models, Document } from "mongoose";

// TypeScript Interfaces
export interface ILesson {
  lessonNumber: number;
  title: string;
  description: string;
  hours: number;
  outcomes: string[];
}

interface IOverviewMedia {
  type: string;
  url: string;
}

export interface ICourse extends Document {
  courseId: string;
  price: number;
  ageGroup: string;
  courseName: string;
  toolUsed: string;
  totalClasses: number;
  totalHours: number;
  title: string;
  overviewDescription: string;
  coverImage?: string;
  cardImage?: string;
  overviewMedia?: IOverviewMedia;
  lessons: ILesson[];
  keyLearningOutcomes: string[];
  endProductShowcaseMedia: string[];
  isPublished: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Lesson Schema
const lessonSchema = new Schema<ILesson>({
  lessonNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Number, required: true },
  outcomes: [{ type: String }]
});

// Course Schema
const courseSchema = new Schema<ICourse>({
  courseId: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  ageGroup: { type: String, required: true },
  courseName: { type: String, required: true },
  toolUsed: { type: String, required: true },
  totalClasses: { type: Number, required: true },
  totalHours: { type: Number, required: true },
  title: { type: String, required: true },
  overviewDescription: { type: String, required: true },
  coverImage: { type: String },
  overviewMedia: {
    type: {
      type: String,
      enum: ['video', 'image'],
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  lessons: [lessonSchema],
  keyLearningOutcomes: [{ type: String }],
  endProductShowcaseMedia: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  slug: { type: String, unique: true }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create slug from course name before saving
courseSchema.pre('save', function(next) {
  if (this.courseName && !this.slug) {
    this.slug = this.courseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Export the model
let Course;
try {
  Course = models.Course || model<ICourse>('Course', courseSchema);
} catch {
  Course = model<ICourse>('Course', courseSchema);
}

export default Course; 