const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://Eduardo:Gatosbellos0@paralegal-a.nfevj.mongodb.net/paralegal',
  PORT: process.env.PORT || 5000,
  CORS_ORIGINS: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173'
  ]
};

module.exports = config;