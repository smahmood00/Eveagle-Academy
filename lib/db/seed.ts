import mongoose from 'mongoose';
import Course from './models/course';
import { coursesData } from './seed-data/courses';
import * as dotenv from 'dotenv';
import path from 'path';
import { connectToDB } from './connect';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("MongoDB URI:", MONGODB_URI);

async function seedCourses() {
  try {
    await connectToDB();

    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Insert new courses
    const insertedCourses = await Course.insertMany(coursesData);
    console.log(`Seeded ${insertedCourses.length} courses successfully`);

    // Log the inserted courses
    insertedCourses.forEach(course => {
      console.log(`Seeded course: ${course.courseName} (${course.courseId})`);
    });

  } catch (error) {
    console.error('Error seeding courses:', error);
    throw error;
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Execute the seeding function
seedCourses()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error in seed script:', error);
    process.exit(1);
  }); 