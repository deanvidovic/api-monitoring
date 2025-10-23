import express from 'express';
import { proxyRequest } from '../controller/requestController.js'; // import named export

const router = express.Router();

router.post('/', proxyRequest);

export default router;
