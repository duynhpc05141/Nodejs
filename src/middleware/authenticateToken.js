const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ABC';

// Middleware để xác thực JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) return res.sendStatus(401); // Unauthorized
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user;
      next();
    });
  }
module.exports = authenticateToken;
