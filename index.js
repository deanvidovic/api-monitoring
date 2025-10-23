import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import proxyRoutes from './routes/proxyRoutes.js';
dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());


app.use(proxyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
