import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://maheshdkd47:vUxjzdXlD03jMI5P@darkmonster.lzbzr.mongodb.net/?retryWrites=true&w=majority&appName=darkmonster';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect(): Promise<typeof mongoose> {
  try {
    const opts = {
      bufferCommands: false,
    };

    const connection = await mongoose.connect(MONGODB_URI, opts);
    console.log('MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default dbConnect;