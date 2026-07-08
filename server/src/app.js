import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { generalLimiter } from './middlewares/rateLimiter.js';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import debugRoutes from './routes/debugRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { sendResponse } from './utils/response.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(generalLimiter);
app.use(passport.initialize());

app.get('/api/health', (req, res) => sendResponse(res, 200, true, 'Server is healthy'));
app.use('/api/auth', authRoutes);
app.use('/api/debug', debugRoutes);
app.use('/api/donors', donorRoutes);
app.use('/api/emergency-requests', emergencyRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  sendResponse(res, 500, false, 'Internal server error');
});

export default app;
