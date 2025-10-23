import axios from "axios";
import { pool } from "../../database/db.js";
import { getData } from "../requestControllerHelper.js";

const SLOW_RESPONSE_THRESHOLD = 100; // in milliseconds

export const reciveRequest = async (req, res) => {
    try {
        const { method, url, data } = req.body;
        const start = Date.now();

        const response = await axios({ method, url, data });
        const responseTime = Date.now() - start;

        const query = `
            INSERT INTO public.requests 
                (method, path, response, status_code, response_time)
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

        const savedRequest = rows[0];

        if (responseTime > SLOW_RESPONSE_THRESHOLD) {
            const queryProblem = `
                INSERT INTO public.problems (request_id, type, response_time)
                VALUES ($1, $2, $3)
            `;
            const valuesProblem = [savedRequest.id, 'slow-response', responseTime];
            await pool.query(queryProblem, valuesProblem);
        }

        res.json({ message: "Request saved! [fucntion: proxyRequest()]", request: rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

export const getRequests = (req, res) => getData(req, res, 'requests', 
    ['id', 'method', 'status_code', 'path', 'response_time', 'created_at'], 
    ['created_at', 'response_time']
);

export const getProblems = (req, res) => getData(req, res, 'problems', 
    ['id', 'request_id', 'type', 'response_time', 'created_at'], 
    ['created_at', 'response_time']
);