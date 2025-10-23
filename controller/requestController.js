import axios from "axios";
import { pool } from "../database/db.js";

export const proxyRequest = async (req, res) => {
    try {
        const { method, url, data } = req.body;
        const start = Date.now();

        const response = await axios({ method, url, data });
        const responseTime = Date.now() - start;

        const query = `
            INSERT INTO public.requests 
                (method, path, response, statuscode, responsetime)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [
            method,
            url,
            JSON.stringify(response.data),
            response.status,
            responseTime
        ];

        const { rows } = await pool.query(query, values);

        res.json({ message: "Request saved! [fucntion: proxyRequest()]", request: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getRequests = async (req, res) => {
    try {
        const {
            sortBy = 'createdat',
            order = 'desc',
            method,
            minResponseTime,
            maxResponseTime,
            search
        } = req.query;

        let baseQuery = `SELECT id, method, statuscode AS response, path, responsetime, createdat 
                         FROM public.requests WHERE 1=1`;

        const values = [];
        let idx = 1;

        if (method) {
            baseQuery += ` AND method = $${idx++}`;
            values.push(method);
        }
        if (minResponseTime) {
            baseQuery += ` AND responsetime >= $${idx++}`;
            values.push(Number(minResponseTime));
        }
        if (maxResponseTime) {
            baseQuery += ` AND responsetime <= $${idx++}`;
            values.push(Number(maxResponseTime));
        }
        if (search) {
            baseQuery += ` AND (path ILIKE $${idx} OR response::text ILIKE $${idx})`;
            values.push(`%${search}%`);
        }

        const allowedSort = ['createdat', 'responsetime'];
        const sortColumn = allowedSort.includes(sortBy.toLowerCase()) ? sortBy : 'createdat';
        const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        baseQuery += ` ORDER BY ${sortColumn} ${sortOrder}`;

        const { rows } = await pool.query(baseQuery, values);
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};