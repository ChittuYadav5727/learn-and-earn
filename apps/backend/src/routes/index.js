import { Router } from 'express';
import { getDbStatus } from '../config/db.js';
import adminRoutes from './adminRoutes.js';
import authRoutes from './authRoutes.js';
import providerRoutes from './providerRoutes.js';
import publicRoutes from './publicRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Learn & Earn API is running',
  });
});

router.get('/health', (req, res) => {
  const db = getDbStatus();
  const isHealthy = db.state === 'connected' || db.state === 'connecting';

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy ? 'API is healthy' : 'API is running but database is unavailable',
    data: {
      uptime: Math.round(process.uptime()),
      db,
    },
  });
});

router.use('/public', publicRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/providers', providerRoutes);
router.use('/admin', adminRoutes);

export default router;
