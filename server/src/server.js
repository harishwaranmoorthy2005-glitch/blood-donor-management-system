import 'dotenv/config.js';

import app from './app.js';
import connectDB from './config/db.js';
import './jobs/worker.js';

const PORT = process.env.PORT || 5000;
const startupGuardKey = '__bloodDonorServerStarted__';

if (globalThis[startupGuardKey]) {
  console.warn('Server startup already initialized. Skipping duplicate listener.');
} else {
  globalThis[startupGuardKey] = true;

  connectDB().then(() => {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
      } else {
        console.error(error);
      }
    });
  });
}
