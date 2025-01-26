// === config/config.js ===
const config = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://Eduardo:Gatosbellos0@paralegal-a.nfevj.mongodb.net/paralegal',
    PORT: process.env.PORT || 5000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
  };
  
  module.exports = config;