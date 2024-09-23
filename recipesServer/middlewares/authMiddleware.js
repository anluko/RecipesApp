const jwt = require('jsonwebtoken');
const secretKey = "H6nv=WN!?d85[/7;bCBr'~{KL*9";

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) { 
    console.log('Токен не предоставлен');
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) { 
        console.log('Неверный токен: ' + err);
        return res.status(401).json({ error: 'Неверный токен' })
    };
    
    req.user = decoded; 
    next();
  });
};

module.exports = verifyToken;