import dotenv from 'dotenv';

dotenv.config();

function readEnv(name, fallback = '') {
  const value = process.env[name];
  return value === undefined || value === '' ? fallback : value;
}

export const env = {
  nodeEnv: readEnv('NODE_ENV', 'development'),
  port: Number(readEnv('PORT', 5000)),
  mongoUri: readEnv('MONGODB_URI', 'mongodb://127.0.0.1:27017/learn-and-earn'),
  jwtSecret: readEnv('JWT_SECRET', 'replace-this-in-production'),
  jwtExpiresIn: readEnv('JWT_EXPIRES_IN', '7d'),
  clientUrl: readEnv('CLIENT_URL', 'http://localhost:5173'),
  rateLimitWindowMs: Number(readEnv('RATE_LIMIT_WINDOW_MS', 15 * 60 * 1000)),
  rateLimitMax: Number(readEnv('RATE_LIMIT_MAX', 120)),
  googleAuthUrl: readEnv('GOOGLE_AUTH_URL', ''),
  githubAuthUrl: readEnv('GITHUB_AUTH_URL', ''),
};
