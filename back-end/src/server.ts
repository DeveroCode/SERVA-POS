import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import { corsOptions } from './config/cors';
const port = process.env.PORT || 4000;

dotenv.config();
// Database connection
connectDB();
// Middlewares
const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));

// Routes

export default app;