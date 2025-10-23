import { pool } from "../database/db.js";

export const saveRequest = async (method, path, response, statusCode, responseTime) => {
    const query = `
        INSERT INTO public.requests 
            (method, path, response, statuscode, responsetime)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    
    const values = [method, path, JSON.stringify(response), statusCode, responseTime];
    
    const { rows } = await pool.query(query, values);
    return rows[0];
};
