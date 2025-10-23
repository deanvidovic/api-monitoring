import express from 'express';
import { reciveRequest, getRequests } from '../controller/request/requestController.js'
import { getProblems } from '../controller/problem/problemController.js'; 

const router = express.Router();

router.post('/api/recive/requests', reciveRequest);

router.get('/api/return/problems', getProblems);
router.get('/api/return/requests', getRequests);

export default router;
