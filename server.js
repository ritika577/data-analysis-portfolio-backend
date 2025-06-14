require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const certificationRoutes = require('./routes/certificationRoutes');

// Initialize express
const app = express();

// CORS configuration
const allowedOrigins = [
  'https://data-analysis-portfolio-client.vercel.app',
  'http://localhost:3000', // For local development
  'http://localhost:5173'  // Vite default port
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

// Connect to MongoDB with better error handling
const connectDB = async () => {
    console.log('🔌 Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
            socketTimeoutMS: 60000, // Increased to 60 seconds
            connectTimeoutMS: 10000, // Added connection timeout
            maxPoolSize: 10, // Maximum number of connections in the connection pool
            retryWrites: true,
            w: 'majority'
        });
        console.log('✅ MongoDB connected successfully');
        
        console.log('✅ MongoDB connected successfully');
        
        // Connection events
        mongoose.connection.on('connected', () => {
            console.log('✅ Mongoose connected to DB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('❌ Mongoose disconnected');
        });
        
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        // Exit process with failure
        process.exit(1);
    }
};

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);

// Simple route for testing
app.get('/', (req, res) => {
    res.json({
        status: 'API is running',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            if (error.syscall !== 'listen') throw error;
            
            switch (error.code) {
                case 'EACCES':
                    console.error(`Port ${PORT} requires elevated privileges`);
                    process.exit(1);
                case 'EADDRINUSE':
                    console.error(`Port ${PORT} is already in use`);
                    process.exit(1);
                default:
                    throw error;
            }
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Start the application
startServer();
