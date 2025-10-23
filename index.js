import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import proxyRoutes from './routes/proxyRoutes.js';
import { pool } from "./database/db.js";
dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());

// app.get('/check-requests-table', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM public.requests LIMIT 1');
//         res.json({ success: true, rows: result.rows });
//     } catch (err) {
//         console.error('Table error:', err);
//         res.status(500).json({ success: false, error: err.message });
//     }
// });


app.use('/api/proxy', proxyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
