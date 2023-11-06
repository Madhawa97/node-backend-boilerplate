import express from 'express';
import { getUserProfile } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', requireAuth, getUserProfile);

export default router;
