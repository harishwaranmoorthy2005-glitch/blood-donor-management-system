import { Queue } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null
});

connection.on('connect', () => console.log('BullMQ Redis connection established'));
connection.on('error', (error) => console.error('BullMQ Redis connection error:', error.message));

export const notificationQueue = new Queue('notificationQueue', { connection });

export const addNotificationJob = async (jobData) => {
  await notificationQueue.add('send-notification', jobData, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 }
  });
};
