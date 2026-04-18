import app from './app.js';
import { connectDb, disconnectDb } from './config/db.js';
import { env } from './config/env.js';

let server;
let isShuttingDown = false;

async function startServer() {
  await connectDb();
  server = app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`);
  });
}

async function shutdown(signal, error) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  if (signal) {
    console.warn(`${signal} received. Shutting down Learn & Earn API.`);
  }

  if (error) {
    console.error('Fatal process error', error);
  }

  try {
    await new Promise((resolve) => {
      if (!server) {
        resolve();
        return;
      }

      server.close(() => resolve());
    });
    await disconnectDb();
  } finally {
    process.exit(error ? 1 : 0);
  }
}

process.on('SIGINT', () => {
  shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM');
});

process.on('uncaughtException', (error) => {
  shutdown('uncaughtException', error);
});

process.on('unhandledRejection', (error) => {
  if (env.nodeEnv === 'production') {
    shutdown('unhandledRejection', error);
    return;
  }

  console.error('Unhandled promise rejection', error);
});

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
