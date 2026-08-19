import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import { corsOptions } from './config/cors';
import UserRoute from './route/UserRoute';
import BusinessRoute from './route/BusinessRoute';
import BranchRoute from './route/BranchRoute';
const port = process.env.PORT || 4000;

dotenv.config();
// Database connection
connectDB();
// Middlewares
const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', UserRoute);
app.use('/api/business', BusinessRoute);
app.use('/api/branch', BranchRoute);
export default app;