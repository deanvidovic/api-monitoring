import { getData } from "../requestControllerHelper.js";

export const getProblems = (req, res) => getData(req, res, 'problems', 
    ['id', 'request_id', 'type', 'response_time', 'created_at'], 
    ['created_at', 'response_time']
);
