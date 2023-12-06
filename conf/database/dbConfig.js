import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://DJ0212:devansh%400212@cluster0.djsnamb.mongodb.net/ics", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.set('strictQuery', true);

    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
      // Implement reconnection logic if necessary
    });

    db.once('open', () => {
      console.log('MongoDB connected');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectDB;
