import { Worker } from 'bullmq';
import Redis from 'ioredis';
import Notification from '../models/Notification.js';

const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null
});

connection.on('connect', () => console.log('Notification worker Redis connected'));
connection.on('error', (error) => console.error('Notification worker Redis error:', error.message));

const startWorker = async () => {
  try {
    const worker = new Worker(
      'notificationQueue',
      async (job) => {
        const { userId, title, message, type } = job.data;
        console.log('[auth-debug] worker received job', { jobId: job.id, userId, title, type });

        await Notification.create({ user: userId, title, message, type });

        return { ok: true };
      },
      { connection }
    );

    worker.on('completed', (job) => console.log(`Job ${job.id} completed`));
    worker.on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err.message));
  } catch (error) {
    console.warn('Notification worker could not start:', error.message);
  }
};

void startWorker();
