const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  // Get the token from the authorization header
  let token = req.headers.authorization;

  // Check for the Bearer scheme
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  token = token.slice(7);
  console.log(token);

  // Verify the token using the secret key
  jwt.verify(token, 'qwe1234', (err, decoded) => {
   
    if (err) {
      return res.status(401).send({ message: 'Unauthorized ' });
    }

   

    // Add the decoded token to the request object
    req.user = decoded;
    next();
  });
}

// to generate token for test
// const payload = { email: 'salmaghozlan@gmail.com' };
// const secretKey = 'qwe1234';
// const token = jwt.sign(payload, secretKey);

// console.log(token);

module.exports = { verifyToken };
