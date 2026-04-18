import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { getDbStatus } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import apiRoutes from './routes/index.js';

const app = express();
const allowedOrigins = new Set(
  [env.clientUrl, ...env.clientUrls, 'http://127.0.0.1:5173', 'http://localhost:5173'].filter(Boolean)
);

function isLocalDevOrigin(origin) {
  return /^http:\/\/(localhost|127\.0\.0\.1):\d+$/i.test(origin);
}

function isAllowedOrigin(origin) {
  if (allowedOrigins.has(origin)) {
    return true;
  }

  if (env.nodeEnv === 'development' && isLocalDevOrigin(origin)) {
    return true;
  }

  if (env.allowVercelPreviews) {
    return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
  }

  return false;
}

const apiLimiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again shortly.',
  },
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(morgan('dev'));
app.use(apiLimiter);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  const db = getDbStatus();
  const isHealthy = db.state === 'connected' || db.state === 'connecting';

  res.status(isHealthy ? 200 : 503).json({
    success: isHealthy,
    message: isHealthy ? 'Server is healthy' : 'Server is running but database is unavailable',
    data: {
      uptime: Math.round(process.uptime()),
      db,
    },
  });
});

app.use('/api', apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
