import express from 'express';
import {
  createRegistration,
  getMyRegistrations,
  verifyCheckIn,
  getEventAttendees,
} from '../controllers/registrationController.js';

const router = express.Router();

router.post('/', createRegistration);
router.get('/my', getMyRegistrations);
router.post('/checkin', verifyCheckIn);
router.get('/event/:eventId', getEventAttendees);

export default router;
