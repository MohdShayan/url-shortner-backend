import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ConnectDB } from './connection/connnectDB.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();

ConnectDB(); 

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/url', urlRoutes);

// Export the app for Vercel
export default app;
