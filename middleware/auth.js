// Static token authentication middleware
require('dotenv').config();
const staticToken = process.env.API_SECRET_KEY;

if (!staticToken) {
  console.error('ERROR: API_SECRET_KEY is not defined in environment variables');
  process.exit(1);
}

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.split(' ')[1]; // Get token from 'Bearer <token>'
    
    if (!token || token !== staticToken) {
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }

    // Token is valid, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error during authentication' 
    });
  }
};

module.exports = { authenticate };