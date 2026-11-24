import express from 'express';
import { getHackathons, getHackathonStatus, triggerHackathonHarvest } from '../controllers/hackathonController.js';

const router = express.Router();

router.get('/', getHackathons);
router.get('/status', getHackathonStatus);
router.post('/status', getHackathonStatus);
router.post('/harvest', triggerHackathonHarvest);
router.get('/harvest', triggerHackathonHarvest);
router.post('/sync', triggerHackathonHarvest);
router.get('/sync', triggerHackathonHarvest);
router.post('/run', triggerHackathonHarvest);

export default router;
