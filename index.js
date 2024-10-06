import express, { urlencoded } from 'express'
import dotenv from "dotenv"
import cors from "cors"
import { ConnectDB } from './connection/connnectDB.js';
import urlRoutes from './routes/urlRoutes.js'

const app= express();
app.use(cors());
dotenv.config();

const PORT= process.env.PORT || 5001

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/url',urlRoutes);

app.listen(PORT,()=>{
    ConnectDB();
    console.log(`Server Started at http://localhost:${PORT}`);
})