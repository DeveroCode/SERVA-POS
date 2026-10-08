import { connectDB, disconnectDB } from "../config/db";
import { seedCategories } from "./Category.seed";

const run = async () => {
    try {
        await connectDB();
        await seedCategories();
        await disconnectDB();
        console.log("✅ Categories seeded successfully.");
    } catch (error) {
        console.error("❌ Error running seeders:", error);
        await disconnectDB();
    }
};

run();