import express from 'express';
import {
  getCommunities,
  getCommunityById,
  getPosts,
  createPost,
} from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getCommunities);
router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/:id', getCommunityById);

export default router;
