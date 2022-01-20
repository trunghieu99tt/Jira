import mongoose, { ConnectOptions } from 'mongoose';
import { DATABASE_URL } from './env';

export const initializeMongoDb = (): void => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  } as ConnectOptions);

  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.error(
      'MongoDB connection error. Please make sure MongoDB is running.',
    );
    process.exit(1);
  });
};
