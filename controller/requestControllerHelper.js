import { pool } from "../database/db.js";

export const getData = async (req, res, table, columns, allowedSortColumns) => {
    try {
        const {
            sortBy = allowedSortColumns[0],
            order = 'desc',
            search,
            ...filters
        } = req.query;

        let baseQuery = `SELECT ${columns.join(', ')} FROM public.${table} WHERE 1=1`;
        const values = [];
        let idx = 1;

        for (const key in filters) {
            if (filters[key]) {
                baseQuery += ` AND ${key} = $${idx++}`;
                values.push(filters[key]);
            }
        }

        if (search) {
            const searchConditions = columns.map(col => `${col}::text ILIKE $${idx}`).join(' OR ');
            baseQuery += ` AND (${searchConditions})`;
            values.push(`%${search}%`);
        }

        // Sorting
        const sortColumn = allowedSortColumns.includes(sortBy.toLowerCase()) ? sortBy : allowedSortColumns[0];
        const sortOrder = order.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        baseQuery += ` ORDER BY ${sortColumn} ${sortOrder}`;

        const { rows } = await pool.query(baseQuery, values);
        res.json({ success: true, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};
