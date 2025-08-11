import jwt from 'jsonwebtoken';

// Admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'bridge2025!'
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Validate credentials
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Generate JWT token
    const token = jwt.sign(
      { 
        username: username,
        isAdmin: true,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      },
      JWT_SECRET
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token
    });
  } else {
    // Add a small delay to prevent brute force attacks
    setTimeout(() => {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }, 1000);
  }
}