import mongoose from "mongoose";
import colors from "colors";
import { exit } from "process";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI as string);
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(colors.bgGreen.black(`MongoDB Connected successfully at ${url}`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        exit(1);
    }
}

export const disconnectDB = async () => {
    await mongoose.disconnect();
}