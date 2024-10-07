import mongoose from "mongoose";

export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI not provided in environment variables");
    }

    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    throw error; 
  }
};
