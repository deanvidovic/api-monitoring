import express from 'express';
import { proxyRequest, getRequests } from '../controller/requestController.js'; // import named export

const router = express.Router();

router.post('/api/proxy', proxyRequest);
router.get('/api/requests', getRequests);

export default router;
