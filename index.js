import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ConnectDB } from './connection/connnectDB.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://url-shortner-frontend-liard.vercel.app', // replace with your frontend URL
  credentials: true // if you are sending cookies or authorization headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to the database once, when handling requests
app.use((req, res, next) => {
    ConnectDB(); 
    next();
});

app.use('/api/url', urlRoutes);

// Export the app for Vercel
export default app;
