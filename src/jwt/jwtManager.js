const jwt = require("jsonwebtoken");

const secretKey = process.env.AUTH_KEY;

function generateJwt(userId, username){
    return jwt.sign( {userId: userId, username: username}, secretKey, { expiresIn: '1h'})
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied');
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user;
    next();
  });
}

function decodeJwt(headers) {
  const token = headers.split("Bearer ")[1];
  return jwt.decode(token);

}

module.exports = { generateJwt, authenticateToken, decodeJwt };