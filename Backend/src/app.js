const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const userRoutes = require('./routes/user.routes');
const historyRoutes = require('./routes/history.routes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Allow frontend origin (development: permit any localhost port) and allow credentials for cookie auth
const corsOptions = process.env.NODE_ENV === 'production'
  ? { origin: process.env.CLIENT_ORIGIN || 'https://your-production-domain.com', credentials: true }
  : { origin: (origin, cb) => cb(null, true), credentials: true };

app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/history', historyRoutes);

// In production serve built frontend
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../Frontend/dist');
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => res.sendFile(path.join(frontendDist, 'index.html')));
}

module.exports = app;
