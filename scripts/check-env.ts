import { config } from 'dotenv';

// Load environment variables from .env file
config();

const requiredEnvVars = [
  'JWT_SECRET',
  'MONGODB_URI',
  // Add other required environment variables here
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => {
    console.error(`   - ${envVar}`);
  });
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set');
  console.log('\nEnvironment variables found:');
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    console.log(`   - ${envVar}: ${value ? '********' : 'not set'}`);
  });
} 