import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getNearbyEvents,
  autoApproveDraft,
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/nearby', getNearbyEvents);
router.get('/:id', getEventById);
router.post('/auto-approve', autoApproveDraft);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
