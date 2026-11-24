import express from 'express';
import { triggerHarvestCycle, getAgentStatus, getAgentLogs } from '../controllers/agencyAgentController.js';

const router = express.Router();

router.post('/harvest-all', triggerHarvestCycle);
router.get('/status', getAgentStatus);
router.get('/logs', getAgentLogs);

export default router;
