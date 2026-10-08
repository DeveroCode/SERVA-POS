import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB, disconnectDB } from "../config/db";
import { seedCategories } from "./Category.seed";

const freshDatabase = async () => {
    try {
        await connectDB();
        const collections = await mongoose.connection.db?.collections();

        if (collections?.length) {
            await Promise.all(
                collections.map((collection) => collection.deleteMany({}))
            );
        }

        console.log("Database collections cleaned successfully");

        await seedCategories();

        console.log("Database recreated and seeded successfully");
        await disconnectDB();
        process.exit(0);
    } catch (error) {
        console.error("Error resetting database:", error);
        await disconnectDB();
        process.exit(1);
    }
};

freshDatabase();
