import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    const mongoUri: string = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
