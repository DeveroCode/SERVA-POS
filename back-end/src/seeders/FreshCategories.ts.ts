import { connectDB, disconnectDB } from "../config/db";
import { Category } from "../models/Category";
import { seedCategories } from "./Category.seed";

const freshCategories = async () => {
    try {
        await connectDB();

        await Category.deleteMany({});

        console.log("Categories cleaned successfully");

        await seedCategories();

        console.log("Categories recreated and seeded successfully");

        await disconnectDB();
        process.exit(0);
    } catch (error) {
        console.error("Error resetting categories:", error);

        await disconnectDB();
        process.exit(1);
    }
};

freshCategories();