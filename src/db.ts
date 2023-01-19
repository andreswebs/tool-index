import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

async function connect() {
  try {
    if (!process.env.DB_HOST) {
      throw new Error('missing environment variable: DB_HOST');
    }

    const db = await mongoose.connect(process.env.DB_HOST).then((connected) => {
      console.log('Connected');
      return connected;
    });

    db.connection.on(
      'error',
      console.error.bind(console, 'Database connection error:')
    );

    return db;
  } catch (error) {
    console.error(error.toString());
    process.exit(1);
  }
}

export default connect;
