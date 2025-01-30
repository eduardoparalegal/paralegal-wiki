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
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos
  message: 'Too many login attempts, please try again later'
});

// Middleware de seguridad
app.use(helmet()); // Seguridad de Headers HTTP
app.use(mongoSanitize()); // Prevención de inyección NoSQL
app.use(express.json({ limit: '10kb' })); // Limitar tamaño de payload
app.use(cors({
  origin: function(origin, callback) {
      // Permitir peticiones sin origin (como Postman)
      if (!origin) return callback(null, true);
      
      if (config.CORS_ORIGINS.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          console.log('Origin blocked by CORS:', origin);
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Aplicar rate limiting a rutas específicas
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/register', rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3 // 3 intentos de registro por hora
}));

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/test', (req, res) => {
  res.json({ 
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware mejorado
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] Error:`, {
    path: req.path,
    method: req.method,
    error: err.message
  });
  
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: err.message,
    timestamp 
  });
});

const server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
  console.log('\nAvailable routes:');
  console.log('Auth routes:');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/auth/login');
  console.log('\nUser routes (protected):');
  console.log('- GET    /api/auth/users');
  console.log('- GET    /api/auth/users/:id');
  console.log('- PUT    /api/auth/users/:id');
  console.log('- DELETE /api/auth/users/:id');
  console.log('\nTest route:');
  console.log('- GET    /test');
});

// Manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Rejection]', err);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;