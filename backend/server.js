const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const config = require('./config/config');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware de logging básico
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = '[FILTERED]';
    console.log('Request Body:', sanitizedBody);
  }
  next();
});

// Rate Limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later'
});

// Middleware de seguridad
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json({ limit: '10kb' }));

// Configuración CORS actualizada
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Agregar todos los orígenes permitidos
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rutas y middleware existentes...
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth', authRoutes);

// El resto del código permanece igual...

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;